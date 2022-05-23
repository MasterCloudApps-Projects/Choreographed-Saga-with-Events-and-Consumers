#### TODO

Añadir github actions para public base-service y cada servicio 
Estudiar usar un mongo connector shink en vez del MS de order, y un mongo connect para enviar el order created
Estudiar si podemos crear un mongo connect para el panel de control, o promicius o similares
Meter en las compensaciones llamadas a external y decidir si fallan que se hace
Front: añadir una espera, si en x seg no hay respuesta, pintar un texto de "vaya, tarda, puedes irte y te mandaremos una notificación/email/sms"

Subir los delays de external, y provocar desde e2e la caida de servicios, y comprobar que aunque los servicios se caigan antes de recibir una respuesta, ver como se reprocesan los eventos y todo sigue bien
