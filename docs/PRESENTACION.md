---
marp: true
title: CADS - Cloud Apps Delivery System. Transacciones aisladas con sagas y eventos, y sus Consumidores
backgroundColor: white
theme: cads-theme


---

<style scoped> h6 { font-size: 25px } img { margin-top: -30px} </style> 

<!-- _class: centered -->

![width:240px](./LogoMCA.png)

<br/>

### Máster en Cloud Apps


## Saga coreografiada con eventos y consumidores




##### Curso académico 2021/2022 
##### Trabajo de Fin de Máster

<br/>

###### Autor: Miguel García Sanguino <br>Tutor: Micael Gallego Carrillo


---

<!-- backgroundImage: url('./background.png') -->



##### Miguel García Sanguino
- 15 años como developer
- Frontend 80% Backend 20%
- Software engineer en ing




![bg left](./presentation_slide.png)

---
<!-- paginate: false -->
<!-- footer: Máster en Cloud Apps. TFM - Miguel García Sanguino -->


### Introducción

- Transacciones en microservicios
- Patron Saga
- Gobiernos de equipos con microservicios, idependencia
- Experiencia de usuario

<!-- Por experiencias paadas, una transaccion en MS se complican mucho --> 
<!-- en que consiste una saga --> 
<!-- pains en gobierno en empresas grandes --> 
<!-- responder a front 1 vez? rapido pero solo parte o lenta pero completa?  --> 
---

<!-- _class: split -->

<div class=cdiv>

### Objetivos:

- Profundizar transacciones con microservicios coreografiados.

- Investigar la conexión de consumidores a procesos asíncronos largos.
</div>

<div class=ldiv>

#### Middleware
- servicios desacoplados
- saga coreografiada, sin maquina de estados
- enfocado a eventos
- escalables y resilientes

</div>

<div class=rdiv>

#### Frontend
- no impactar en middleware
- independiente y asincrono
- consuma de los eventos
- noficaciones online / offline
</div>


<!-- MIDDLE --> 
<!-- desacoplados -> entre ellos y tambien de los consumidores --> 
<!-- Coreografia -> desconocer la transaccion, indepencida en desarrollo y ciclo de vida, codigo y equipos --> 
<!-- Sin maquina de estados, por quitar la coreografia, simplificar --> 
<!-- Eventos, porque da independencia, capacidad de cambiar el orden de la saga, meter mas pasos --> 
<!-- Por experiencias paadas, una transaccion en MS se complican mucho --> 


<!-- FRONT --> 
<!-- No queremos que el middleware se tenga que preocupar en informarnos ni que consumidores tiene, ni de que modelo de datos necesita cada uno--> 
<!-- comunicacion independiente y asincrona --> 
<!-- propone un BFF consumira eventos, escucha sin molestar --> 
<!--  --> 
<!-- Por experiencias paadas, una transaccion en MS se complican mucho --> 

<!-- Y todas las buenas practicas que hemos aprendido en el master --> 

---

##### Caso de uso

- Caso: pedido de comida online
- Reserva de restaurante
- Asignar un rider
- Realizar pago
- Competar pedidos


![bg right](./home_slide.png)

<!-- Cada paso será un servicio --> 

---
<!-- _class: centered -->

##### Caso de uso



![bg width:750px](front_scrennshot.gif)

<!-- hablar de order??? --> 

---

##### Caso de uso

- Cada paso un servicio
- Rollback en caso de fallo
- Informar al usuario en cada paso

<!-- --> poner un grafico de saga a nivel funcional

![bg left](saga.drawio.png)

<!-- hablar de order??? --> 

---

### middleware

- modular
- servicios independientes
- basada en eventos
- coreografia
- sin maquina de estados
- servicios idempotentes
- resiliencia
- escalabilidad
- independiente del consumidor

<!-- --> cada servicio su bbdd


![bg left 95% ](flow_middle.drawio.png)

---

## Stack middleware

- Kubernetes
- Kafka
- BBDD mongo
- Nodejs, kafkajs, express, mongoose
- Todas las comunicaciones por eventos
- mongo connect

![bg left](middle_stack.drawio.png)

---

## Kafka Mongo connect

Pros
- envia eventos al persistir en bbdd
- simplifica idempotencia

Cons
- un servico más
- obliga a tener mongo en replica set de al menos 3 instancias


<div class=small>

> existen ramas con ambas opciones implementadas

</div>

![bg left](arch_middle.drawio.png)

<!-- --> se planteo debezium, pero se uso connect
---

## Idempotencia

Cuando un evento es recibido, no se actualiza su offset hasta despues de que haya sido enviado el evento de salida. Esto nos obliga a que sean idempontentes a su vez:
- el resto de servicios de la saga
- los servicios externos
- los rollback de la saga
![bg left](idempotente.drawio.png)


---
### Frontend

- backend for frontend
- reactivo
- comunicaciones middle->front
- resiliencia
- escalabilidad
- independiente del consumidor

![bg right](flow_front.drawio.png)

---

## Stack frontend

- BackendForFrontend usa el mismo stack que middleware
- express, como servidor de estaticos también
- Rollup como buildr
- Lit
- Kor-ui, componetes

![bg right](front_stack.drawio.png)

---


## Estaticos y servicio juntos

El contendor front lleva dentro el servicio B4F y los estaticos
- Los desarrolla el equipo front a sus necesidades
- Agiliza el testing
- El front recibe lo que necesita
- El middle es independiente

![bg right](front_container.drawio.png)


---


## Web Sockets vs Server Sent Events vs pooling

No se han encontrado grandes diferencias
- En los 3 casos se queda una conexión abierta
- pooling lo descartaria por dejar 1 hilo y por que a los 30 seg se repite la petición
- server sent events es más sencillo de implementar
- web sockets pormite bidireccionalidad

> seguramente para este caso de uso me quedaria con SSE, si puedo necesitar datos mas complejos o bidireccionalidad, WS
---

## Arquitectura final en kubernetes


![bg right](arch_tfm.drawio.png)

- front
- microservicios
- bases de datos
- Api externals ~ Mocks
- Api notificaciones ~ Mocks
- +Zookeeper
- +kafka

---

## E2E test

Para el testing de todo se han desarrollado unos test e2e en cypress con gherkin

Cada test configura el api externals para decidir cuanto tarda y que respuesta da el banco, el restaurante, y el rider

Cada test decide si el usuario permanece y ve el resultado online, o cierra y comprueba que el servicio de notificaciones realiza la entrega

--- 

<!-- _class: centered -->
## E2E test video
<video width="83%" controls autoplay>
    <source src="e2e.mp4" type="video/mp4">
</video>

---
