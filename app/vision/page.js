"use client";

import { useState } from "react";
import axios from "axios";
import CurrentFileIndicator from "@/components/CurrentFileIndicator";
import PageHeader from "@/components/PageHeader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEye, faSpinner } from "@fortawesome/free-solid-svg-icons"

export default function Vision() {
    // 是否在等待回應
    const [isWaiting, setIsWaiting] = useState(false);
    const [result, setResult] = useState("");

    function changeHandler(e) {
        // 將使用者上傳的圖片轉換成base64 POST到 /api/vision-ai { base64: "" }
        console.log("檔案被改變了", e.target.files);

        //取得使用者傳入的圖
        const file = e.target.files[0];
        console.log(file);
        const fileReader = new FileReader;
        //設定成正在等候 && 清空上一次的結果
        setIsWaiting(true);
        setResult("");

        //讀取完成後要做的事情
        fileReader.onloadend = function () {
            console.log("讀取完成");
            //取得圖片轉成的base64
            const base64 = fileReader.result;
            console.log(base64);
            axios
                .post("/api/vision-ai", { base64 })
                .then(res => {
                    console.log("res:", res);
                    setResult(res.data.result);
                    setIsWaiting(false);

                })
                .catch(err => {
                    console.log("err:", err);
                    alert("發生錯誤！");
                    setIsWaiting(false);
                });
        };

        //請讀取器讀取圖片
        fileReader.readAsDataURL(file);
    }

    return (
        <>
            <CurrentFileIndicator filePath="/app/vision/page.js" />
            <PageHeader title="AI Vision" icon={faEye} />
            <section>
                <div className="container mx-auto">
                    <label
                        htmlFor="imageUploader"
                        className="inline-block bg-amber-500 hover:bg-amber-600 px-3 py-2 text-white">
                        Upload Image
                    </label>
                    <input
                        className="hidden"
                        id="imageUploader"
                        type="file"
                        onChange={changeHandler}
                        accept=".jpg, .jpeg, .png"
                    />
                    {isWaiting ?
                        <>
                            <FontAwesomeIcon
                                icon={faSpinner}
                                className="fa-spin text-xl text-state-600 mx-3" />
                            <span>Loading...</span>
                        </> : null}
                    <textarea
                        className="border-2 block mt-2 h-[200px] w-full p-2"
                        value={result}
                        readOnly
                    >

                    </textarea>
                </div>
            </section>
            <section>
                <div className="container mx-auto">
                    {/* TODO: 顯示AI輸出結果 */}

                </div>
            </section>
        </>
    )
}