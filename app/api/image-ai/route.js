import openai from "@/services/openai";
import db from "@/services/db";

const collectionName = "image-ai";

export async function GET() {
    const imageGenList = [];
    const docList = await db.collection(collectionName).orderBy("createdAt", "desc").get();
    docList.forEach(doc => {
        const imageGen = doc.data();
        imageGenList.push(imageGen);
    })
    return Response.json(imageGenList);
}

export async function POST(req) {
    const body = await req.json();
    const { userInput } = body;
    console.log("body:", body);
    // 透過dall-e-3模型讓AI產生圖片
    // 文件連結: https://platform.openai.com/docs/guides/images/usage
    const prompt = `使用美式漫畫風格畫一個：${userInput}`;
    const response = await openai.images.generate({
        model: "dall-e-3",
        prompt: prompt,
        n: 1,
        size: "1024x1024",
    });
    const imageURL = response.data[0].url;
    console.log(imageURL);
    const imageGen = {
        imageURL,
        prompt,
        createdAt: new Date().getTime()
    };

    //將 imageGen 存入集合中
    await db.collection(collectionName).add(imageGen);
    return Response.json(imageGen);
}