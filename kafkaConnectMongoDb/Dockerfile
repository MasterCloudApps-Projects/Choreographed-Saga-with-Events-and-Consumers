FROM confluentinc/cp-kafka-connect:7.0.1

RUN pip install envsubst
RUN confluent-hub install --no-prompt mongodb/kafka-connect-mongodb:1.4.0

WORKDIR /home/appuser
COPY *.properties .
COPY startConnect.sh .

CMD ["./startConnect.sh"]
