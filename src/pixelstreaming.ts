import {Config, Logger, PixelStreaming} from "@thingue/lib-pixelstreamingfrontend";
import {v4 as uuidv4} from "uuid";

async function playerUrlBuilder() {
    const result = await fetch("/api/instance/ticketSelect", {
        method: 'POST',
        headers: new Headers([["Content-Type", "application/json"]]),
        body: JSON.stringify({
            // playerCount: -1
        }),
    })
    if (!result.ok) throw new Error("网络请求失败");
    const response = await result.json()
    if (response.code === 200) {
        const origin = window.location.origin.replace('http://', 'ws://').replace('https://', 'wss://');
        return `${origin}/ws/player/${response.data.ticket}`;
    } else {
        throw new Error(response.msg);
    }
}

let stream: PixelStreaming;

function createStream() {
    Logger.SetLoggerVerbosity(-1)
    const config = new Config({
        initialSettings: {
            AutoPlayVideo: true,
            AutoConnect: true,
            OfferToReceive: true,
            HoveringMouse: true,
            StartVideoMuted: true,
            MatchViewportRes: true,
        },
        useUrlParams: true
    });

    stream = new PixelStreaming(config, {
        playerUrlBuilder: playerUrlBuilder
    })

    // 监听UE发过来的数据
    stream.addResponseEventListener("user_handler", function (response) {
        console.log(response)
    })

    // 移除事件监听
    // stream.removeResponseEventListener("user_handler")

}

// 向UE发送数据
function sendUserCommand(param: any) {
    const uuid = uuidv4();
    stream.emitUIInteraction({
        type: "UserCommand",
        uuid,
        command: "ToUEMessage",
        param
    })
}

export {
    stream, createStream, sendUserCommand
}

