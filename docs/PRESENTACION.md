---
marp: false
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
Un front en un master de cloud apps ¿De que hago el TFM?

Procesos complicados ...
Multi respuestas ...
Asincronia ...
Actualizaciones ...
Modelos de datos ...
Relaciones entre squads ...
<br />
Trabajo de investigación

<!-- 
Contar anecdota de procesos asincronos que no llegaron a hacerse y otras...

Contar anecdota de modelos de datos, notificaciones...

-->

---

<!-- backgroundImage: url('./background.png') --> 
![bg center](slide_modelos.png)

### Pains - modelos de datos
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

---

![bg right](wc_update.drawio.png)

### Pains - respuestas asincronas

Proceso depende de otra acción humana

Solución: comunicación servidor - cliente

Long pooling, WebComponents, o ServerSentEvents, servicio con complejidad extra !~ funcional
<br/>

---

![bg left](multiple_response.drawio.png)

### Pains - respuestas asincronas

Proceso depende de otros asincronos

Solución: espera? 204 y preguntar?

De nuevo pooling, WC o SSE, pero que servicio se queda con la conexión?

<br/>

---

![bg right](BFF_pattern.drawio.png)

### Patron Backend for Frontend

Uno por cada tipo de cliente

Adapta el api a cada consumidor

Simplifica clientes

Elimina la sobrecarga de servicios

<br />

<!--
La idea es 1 por cada tipo de cliente

saga es un patron asegura consistencia

crea estructuras para caminos felices y marchas atras en caso de fallo

una muy usada, orquestacion y maquina de estados, pero acopla mucho

problemas en gobierno muchos equipos en empresas grandes


 --> 

---



### BFF : añadir un servicio solo para el front

Front recibe los datos que necesita,
cuando los necesita, desde el BFF,
en el formato que los necesita,
sin entorpecer a middle,
ni en el modelo,
ni con desarrollos extra

---


![bg left](saga_pattern.drawio.png)

### Pains - transacciones

Antes teniamos transacciones ACID "simples"

Si tenemos multiples bases de datos? que hacermos?

 <br>
 <br>

---


![bg left](old_pattern.drawio.png)

### Pains - respuesta al front

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


![bg left](saga_pattern.drawio.png)

### Patron Saga

- Transacción en microservicios
- 1 servicio - 1 transacción
- Si algo va mal rollback de todo
- Asegura Consistencia
- Orquestadas / Coreografiadas

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


##### Caso de uso

Pedido de comida online

- Asincrono

- Depende de servicios externos

- Actualizaciones multiples

- Transacciones

- Modelos diferentes


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

![bg left](saga.drawio.png)

 ##### Caso de uso

Saga middleware

Cada paso un servicio

Rollback en caso de fallo

Informar al usuario en cada paso


<!-- completada vs cancelada --> 

---

![bg left](sagaConBFF.drawio.png)

 ##### Caso de uso

BFF consume los mismo eventos

Cada paso el BFF informa al front

Middleware no hace nada especial

<!-- completada vs cancelada --> 
---

<!-- _class: split -->
<div class=cont>
<div class=cdiv>

### Objetivos:

Servicios desacoplados
Respuestas multiples asincronas
El middleware no se tiene que preocupar del front
Escalables y resilientes
Squads Desacoplados, no solo técnico

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

## Arquitectura


![bg right](arch_tfm.drawio.png)

- ingress
- front
- servicios + bases de datos
- externals ~ Mocks
- notificaciones ~ Mocks
- Zookeeper y kafka

<!-- También están incluidos kowl y Kafka-ui -->
---

## Stack

- Kubernetes
- Kafka
- Mongo DB
- Nodejs
- kafkajs
- express
- mongoose
- Rollup como builder
- Lit
- Kor-ui

<br/>
<br/>

![bg left](full_stack.drawio.png)

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


## Estáticos y BFF juntos

El contendor front lleva dentro el servicio BFF y los estáticos
- Los desarrolla el equipo front a sus necesidades
- Agiliza el CI/CD y el testing
- Decide si envía online / offline

![bg right](front_container.drawio.png)


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

### Flujo Frontend

- backend for frontend
- sin bbdd
- reenvía eventos de middle a front
- convierte eventos en notificaciones
- adapta modelos

![bg left](flow_front.drawio.png)


---


## Web Sockets vs Server Sent Events vs pooling


- En los 3 casos se queda una conexión abierta, tiempos muy similares
- Pooling descartado por dejar 1 hilo y porque a los 30 seg se repite la petición
- Server Sent Events es REST
- Web Sockets permite bidireccionalidad y datos complejos


<!--   -->
---


<div class="white">

# DEMO TIME!

![bg](demo.jpg)

</div>

---

## Escalabilidad y resiliencia

![bg right](./escalaResiliencia.drawio.png)

Servicios idempotentes, 1 evento 1 instancia.

BFF 1 usuario 1 instancia, 1 evento a todas las instancias.

Si instancia cae, front reconecta

Fallback con notificaciones

---

## E2E test

![bg left](./e2e_slide.png)

Test E2E en cypress con gherkin.

Cada test configura el api externals: tiempo y response code
(banco, restaurante, rider).

Tests con el usuario online y offline, check de notificaciones.

Tests comprueban el rollback en las bbdd.

> [reportes mocha y cucumber](http://tfm.sanguino.io/)

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

- Actualizar datos cuando llegan, tanto eventos como en bbdd
  - Usuario actualiza sus datos en el momento
  - Evita la sobrecarga del middleware
  - Evita recargas o gestion de cache
  - Desacoplamiento middle - frontend


---

<!-- _class: centered -->

<style scoped> h2 { font-size: 80px }</style> 

<br />
<br />
<br />
<br />
<br />

## GRACIAS!

---

---
### Kafka Mongo connect

#### Pros

envía eventos al persistir en bbdd

simplifica idempotencia

#### Cons
un servico más

obliga a tener mongo en replica set de al menos 3 instancias


<div class=small>

> Finalmente se descarta, no merece la pena

</div>

<br>

![bg left](arch_middle.drawio.png)

<!-- --> se planteo debezium, pero se uso connect

