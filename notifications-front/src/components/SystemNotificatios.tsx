import { useEffect } from "react";
import { useNotificationStore } from "../store/notification";

function formatDate(date: Date) {
  const dia = String(date.getDate()).padStart(2, "0");
  const mes = String(date.getMonth() + 1).padStart(2, "0"); // Los meses son 0-indexados
  const año = date.getFullYear();
  const horas = String(date.getHours()).padStart(2, "0");
  const minutos = String(date.getMinutes()).padStart(2, "0");
  const segundos = String(date.getSeconds()).padStart(2, "0");

  return `${dia}/${mes}/${año} ${horas}:${minutos}:${segundos}`;
}

export default function SystemNotifications() {
  const {
    data,
    loading,
    fetchData,
    getTotal,
    removeNotification,
    updateNotificationRead,
  } = useNotificationStore((state) => state);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) return <div>Cargando...</div>;

  return (
    <>
      <h1 className="text-center bg-slate-500 text-2xl">
        Notificaciones de sistema
      </h1>
      <h2 className="bg-slate-500">
        Cantidad de notificaciones de sistema: {getTotal()}
      </h2>

      <table className="w-full text-center">
        <thead className="bg-blue-400">
          <tr>
            <th>ID</th>
            <th>Nombre del evento</th>
            <th>Tipo de notificación</th>
            <th>Contenido</th>
            <th>Fecha - Hora</th>
            <th>ID Usuario</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map((not) => {
            return (
              <tr key={not.id} className={!not.read ? "bg-slate-300" : ""}>
                <td>{not.id}</td>
                <td>{not.event_name}</td>
                <td>
                  {not.type_notification === "batch" ? "Lote" : "Instantánea"}
                </td>
                <td>{not.content}</td>
                <td>{formatDate(new Date(not.createdAt))}</td>
                <td>{not.iduser}</td>
                <td className="flex justify-center gap-3">
                  <button
                    onClick={() => {
                      updateNotificationRead(not.id, !not.read);
                    }}
                    className="bg-blue-300 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded w-28"
                  >
                    {not.read ? "Leída" : "No Leída"}
                  </button>
                  <button
                    onClick={() => {
                      removeNotification(not.id);
                    }}
                    className="bg-blue-300 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded w-28"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
