// Next.jsの機能なので無視でOK
"use client"

// React.jsの機能なので無視でOK
import { useCallback, useState } from "react";
// 別ファイルで定義したfirebaseの関数を読み込みます
import { login } from "./firebase";

export default function Home() {

  const [name, setName] = useState<string>("");
  const useLogin = useCallback(async () => {
    try {
      const result = await login()
      setName(result.user.displayName ?? '')
      const token = await result.user.getIdToken()
      // このtokenをヘッダーの乗っけてAPIを叩きます
      console.log(token)
    } catch (e) {
      console.error("エラー内容", e)
    }

  }, []);

  return (
    <div>
      <button onClick={useLogin}>ログイン</button>
      <p>{!name && <>未ログイン: { name }</>}</p>
      <p>{name && <>ログイン中の名前: { name }</>}</p>
    </div>
  );
}
