---
marp: true
title: Frontend vitaminized from the backend
backgroundColor: white
theme: cads-theme


---

<style scoped> h6 { font-size: 25px } img { margin-top: 30px} </style> 

<!-- _class: centered -->
<!-- backgroundImage: url('./cover.png') -->

<!-- titulo y me presento y tutor-->
---

<!-- backgroundImage: url('./presentation_slide.png') -->

![bg left](mediaSlideTransparente.png)

##### Miguel García Sanguino
15 años como developer
Frontend 70% Backend 30%
Software engineer en ING



<!-- 
Trabajo en ing, me han pagado el máster CLOUD APP
Esto es un trabajo de investigación, continuación del máster
 -->
---
<!-- backgroundImage: url('./intro_slide.png') -->
<!-- paginate: false -->
<!-- footer: Frontend vitaminized from the backend - Miguel García Sanguino -->


## Frontend vitaminized from the backend
<br />
<!-- _class: centered -->

Trabajo de investigación TFM
Los procesos se han complicados
Las respuestas ya no son siempre únicas
Tenemos respuestas asincronas
Los datos se actualizan en el tiempo
No podemos tener un solo modelo de datos para front y middle
Relaciones entre muchos squads complican el desarrollo

<!-- 

Porque el título?

Porque el título?

Antes una transacción era muy simple, con MS no tanto

Responder a front 1 vez? rapido pero solo parte o lenta pero completa?

Nos quedamos esperando hasta el infinito?

Que hacemos cuando se actualiza un dato?

-->
---

<!-- backgroundImage: url('./background.png') -->

### Premisa: añadir un servicio para front

Nos permitirá que los desarrolladores front reciban los datos que quieren, como quieren y cuando quieren.
Los desarrolladores middle 

---


##### Caso de uso

Pedido de comida online

- Realizar pedido

- Responder rápido

- Actualizar estado

- Completar pedidos


![bg right](./home_slide.png)

<!-- 
El front hace 1 llamada

multiples respuestas

diferentes momento
--> 

---
<!-- _class: centered -->

##### Caso de uso



![bg width:750px](front_scrennshot.gif)

<!-- los pasos happy path --> 

---


![bg left](old_pattern.drawio.png)

### Antipatrones

Has creado el pedido ya?
Has creado el pedido ya?
Has creado el pedido ya?
Si
Has pedido la comida ya?
Has pedido la comida ya?
Has pedido la comida ya?
Si
Has reservado un rider ya?
Has reservado un rider ya?
...
 
<!--
Todos hemos visto cosas parecidas...
 --> 

---

### Objetivos

Servicios desacoplados
Respuestas multiples asincronas
El middleware no se tiene que preocupar del front
Escalables y resilientes
Desacoplamientos de squads, no solo técnico

<br>
<br>
<br>
<!-- 
Facil, no?
Microservicios y websockets
A quien se conecta el front?
Se tiene que preocupar el squad del servicio de restaurantes de mandar al front un mensaje?
--> 

---


![bg left](saga_pattern.drawio.png)

### Patron Saga

Transacción con microservicios
Cada serivicio hace 1 transacción
Si algo va mal rollback de todo

Asegura Consistencia
Orquestadas / Coreografiadas

 <br>
 <br>

<!--
Transaccion en MS se complican mucho

saga es un patron asegura consistencia

crea estructuras para caminos felices y marchas atras en caso de fallo

una muy usada, orquestacion y maquina de estados, pero acopla mucho

problemas en gobierno muchos equipos en empresas grandes


 --> 

 ---


![bg left](saga_pattern2.drawio.png)

### Saga Orquestada

Orquestador llama y espera
Sencilla en procesos sincronos
Acoplamiento de servicios
\+ dificil resiliencia y escalabilidad
<br/>

### Saga Coreografiada

Servicios reciben y envian eventos
Desacoplamiento de servicios
\+ facil resiliencia y escalabilidad
<br/>

 
<!--
Orquestacion es acoplada y 1 unico punto de dolor
Decide el order el orquestador

Coreografiada desacoplada, control distribuido
Orden se decide en eventos
Gobierno de equipos es mas sencillo

 --> 
---

![bg right](BFF_pattern.drawio.png)

### Patron Backend for Frontend

Uno por cada tipo de cliente
Adapta el api a cada consumidor
Simplifica clientes
Elimina la sobrecarga de servicios

 
<!--
La idea es 1 por cada tipo de cliente

saga es un patron asegura consistencia

crea estructuras para caminos felices y marchas atras en caso de fallo

una muy usada, orquestacion y maquina de estados, pero acopla mucho

problemas en gobierno muchos equipos en empresas grandes


 --> 
---

<!-- _class: split -->
<div class=cont>
<div class=cdiv>

### Objetivos:

Servicios desacoplados
Respuestas multiples asincronas
El middleware no se tiene que preocupar del front
Escalables y resilientes
Desacoplamientos de squads, no solo técnico

</div>

<div class=ldiv>

#### Middleware
- servicios desacoplados
- saga coreografiada, sin estados
- comunicacion por eventos
- escalables y resilientes

</div>

<div class=rdiv>

#### Frontend
- pervertir patrón BFF
- consume de los eventos
- independiente y asíncrono
- notificaciones online / offline
</div>
</div>


<!-- MIDDLE  

 desacoplados -> entre ellos y tambien de los consumidores  

 Coreografia -> desconocer la transaccion, indepencida en desarrollo y ciclo de vida, codigo y equipos  

 Sin maquina de estados, por quitar la coreografia, simplificar  

 Eventos, porque da independencia, capacidad de cambiar el orden de la saga, meter mas pasos  

 Por experiencias paadas, una transaccion en MS se complican mucho 
 --> 


<!-- FRONT 

No queremos que el middleware se tenga que preocupar en informarnos ni que consumidores tiene, ni de que modelo de datos necesita cada uno

comunicacion independiente y asincrona 

propone un BFF consumira eventos, escucha sin molestar 

Por experiencias paadas, una transaccion en MS se complican mucho 

Y todas las buenas practicas que hemos aprendido en el master --> 

---

## Stack middleware

- Kubernetes
- Kafka
- BBDD mongo
- Nodejs
- kafkajs
- express
- mongoose

![bg left](middle_stack.drawio.png)

---
### Flujo middleware

- único punto de entrada, independiente del consumidor
- servicios no tienen conexiones entre ellos
- Order genera el orderId y audita
- OrderId como correlation id
- Variables de entorno cambiar orden de la saga
- resiliencia y escalabilidad

<!-- cada servicio su bbdd

Orderid correlationId

** 
 -->


![bg left 95% ](flow_middle.drawio.png)

---

## Idempotencia

Marcamos el offset después de enviar la salida.
Deben ser idempotentes:

- todos los servicios de la saga
- los servicios externos
- los rollback de la saga

![bg left](idempotente.drawio.png)

<!-- 
llevas 6 min!!!

hablar de base service -->

---
## Kafka Mongo connect

Pros
- envía eventos al persistir en bbdd
- simplifica idempotencia

Cons
- un servico más
- obliga a tener mongo en replica set de al menos 3 instancias


<div class=small>

> Finalmente se descarta, no merece la pena

</div>

![bg left](arch_middle.drawio.png)

<!-- --> se planteo debezium, pero se uso connect
---

## Stack frontend

- BFF ~= middleware
- express: rest, WS, SSE, estáticos
- Rollup como builder
- Lit
- Kor-ui

![bg right](front_stack.drawio.png)

---

### Frontend

- backend for frontend
- sin bbdd
- reenvía eventos de middle a front
- convierte eventos en notificaciones
- adapta modelos

![bg left](flow_front.drawio.png)

---


## Estáticos y servicio juntos

El contendor front lleva dentro el servicio BFF y los estáticos
- Los desarrolla el equipo front a sus necesidades
- Agiliza el CI/CD y el testing
- Decide si envía online / offline

![bg right](front_container.drawio.png)


---


## Web Sockets vs Server Sent Events vs pooling


- En los 3 casos se queda una conexión abierta, tiempos muy similares
- Pooling descartado por dejar 1 hilo y porque a los 30 seg se repite la petición
- Server Sent Events es REST
- Web Sockets permite bidireccionalidad y datos complejos

> el caso de uso esta implementado con SSE

<!--   -->
---

## Arquitectura final en kubernetes


![bg right](arch_tfm.drawio.png)

- ingress
- front
- servicios + bases de datos
- externals ~ Mocks
- notificaciones ~ Mocks
- Zookeeper y kafka

<!-- También están incluidos kowl y Kafka-ui -->
---

## E2E test

![bg left](./e2e_slide.png)

Test E2E en cypress con gherkin.

Cada test configura el api externals: tiempo y response code
(banco, restaurante, rider).

Tests con el usuario online y offline, check de notificaciones.

Tests comprueban el rollback en las bbdd.

> reportes: [sanguino.cloud.okteto.net](https://sanguino.cloud.okteto.net/)

--- 

<!-- _class: centered -->
## E2E test video
<video width="83%" controls autoplay>
    <source src="e2e.mp4" type="video/mp4">
</video>

---

## Conclusiones
Objetivos conseguidos:

- Saga coreografiada con eventos en kafka
- Servicios idempotentes, resilientes, escalables e independientes.
- El frontend consume actualizaciones sin afectar a los servicios
- Las piezas y la arquitectura son muy simples, y muy mantenible
- El patron BFF esta pervertido pero es fundamental
- Los squads apenas tienen dependencias entre ellos más haya del contrato de los eventos
- SSE gana sobre WC y Pooling, aunque por poco

<!-- habria que hacer test en el BFF de recursos consumidos -->
--- 
## Otros casos de uso para el BFF

- 
---

<!-- _class: split -->

<div class=cdiv>

## Trabajos futuros

<!-- 
Como resumen evolucionarlo y hacerlo un proyecto "real"

Performance tests de la conexión asíncrona

• En qué casos se bloquean hilos y en cuáles no.
• Cuál consume más recursos.
• Cuántas conexiones en paralelo puede soportar.

Escalabilidad BFF importante si un usiaro esta en una instancia y llega el evento a otra, que hacemos?
Hazelcast!!
 -->
</div>

<div class=ldiv>

Refactor
Performance conexión BFF
Escalabilidad
Testing
CI/CD
</div>

<div class=rdiv>

Observabilidad
Seguridad
Conciliaciones
Frontend – UX
Escalabilidad BFF

</div>

---

<!-- _class: centered -->

<style scoped> h2 { font-size: 80px }</style> 

<br />
<br />
<br />
<br />
<br />

## GRACIAS!

