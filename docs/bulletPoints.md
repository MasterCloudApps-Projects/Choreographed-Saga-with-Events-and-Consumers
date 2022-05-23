
## Objetivos
- profundizar en sagas
- investigar consumidores de eventos
- planteamiento del problema que se soluciona

## Introdución
- Usos de eventos
- Coreografia y enventos para eliminar acoplamiento, desconocimiento entre ellos
- BFF para desacoplar el front. hace de proxy front -> saga y eventos -> front
- otros beneficios del BFF

## Caso de uso
- Just Eat
- rest, rider, payment, explicacion del flujo de la saga
- servicio de order, tiene sentido?

## Stack tecnologico
- menicionar el stack front y middle

## Arquitectura

## Idempotentes
- es lo que nos hace que los servicios sean resilientes, escalables, independientes y no tengan maquina de estado ni orquestador
- explicacion del flujo y posibles cortes con que ocurriria

## Mongo connect
- Que es, como funciona
- Con y sin, pros y cons
- Decision de quitarlo

## Flujo middleware
- explicacion del flujo
- 1 punto de entrada, sin punto de salida
- externals

## Frontend
- Estaticos y BFF en un solo Pod, beneficios
- CI build
- Notificaciones

## Flujo frontend
- Explicacion del flujo
- conexiones rest y WS / SSE / Pooling

## Conexion async
- Pros y const
- Con cual me quedo?

## Arquitectura en kubernetes
- explicaciones de pod e ingress
- Externas y notifications para los test
- kowl y kafka-ui

## Testing E2E
- Cypress
- cucumber / gherkin
- config de externas y notifications
- aserciones front
- aserciones notificaciones
- aserciones contra bbdd de rollbacks y estados

## Conclusiones
- es bastante simple todo a priori
- bff, un must
- no hay tantas diferencias entre WS, SSE y pooling

## Trabajos futuros:
- Refactor
- Performance test de async connection
- Escalabilidad
- Testing
- CI/CD
- Observabilidad
- Seguridad
- Conciliaciones
- Escalabilidad BFF