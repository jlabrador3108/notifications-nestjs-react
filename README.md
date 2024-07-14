# notifications-nestjs-postgresql-react

## Notas

-Se deja el .env del server para que sea comprendida la estructura del mismo

-En /api se en encuentra la documentacion

-Se dividió el sistema principalmete en /notification/system y /notification/email y solo se completaron estos ya que era los de más énfasis y la mayoría de los otros son de pagos

-Pensaba que había que hacer algo en react e hice una pequeña parte(una tabla que lista, elimina y cambia de leído a no leído y viceversa elimina las notificaciones de sistema), por eso subo una carpenta front luego me di cuenta que era por motor de plantillas aunque no pude terminar esta...



## endpoint para autenticar: auth/login (2 usuarios estáticos)

{
"username": "user",
"password": "123456"
}
{
"username": "test",
"password": "123456"
}


## Json para post de: notification/system

{

"event_name": "EVENT_OCCURRED",
"type_notification": "batch",
"content" : "asdasdasd",
"iduser": "asdasd" //si no se especifica se toma el del toquen autenticado

}


## Json para post de: notification/email

{

"event_name": 5,
"type_notification": "batch", // o instantly
"content" : "hola email",
"email": "test@test.com"

}
