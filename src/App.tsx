// eslint-disable-next-line
// @ts-ignore
import mqtt from "mqtt/dist/mqtt.esm";
import {useEffect, useState} from "react";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const client = mqtt.connect('wss://mqtt-wss.lilhuy-services.uk/mqtt');
    const topic = "/test/wss";

    client.on("connect", () => {
      console.log("Connected to EMQ server");
      // Subscribe to topics or perform other actions here
      client.subscribe(topic);
    });
    client.on("error", (error: any) => {
      console.error("MQTT Error:", error);
    });

    client.on("close", () => {
      console.log("Connection to EMQ server closed");
    });

    client.on("message", (receivedTopic: any, message: any) => {
      console.log(
        `Received message on topic ${receivedTopic}: ${message.toString()}`
      );
      setMessage(message.toString());
    });
  }, []);
  return (
    <>
      <h1>MQTT over Websockets wss</h1>
      <p>{message}</p>
    </>
  )
}

export default App
