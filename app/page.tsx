// Next.jsの機能なので無視でOK
"use client"

// React.jsの機能なので無視でOK
import { useCallback, useState } from "react";
// 別ファイルで定義したfirebaseの関数を読み込みます
import { appleLogin, googleLogin  } from "./firebase";
import { UserCredential } from "firebase/auth";

export default function Home() {

  const [name, setName] = useState<string>("");

  const setAuth = useCallback(async (result: UserCredential) => {
    try {
      setName(result.user.displayName ?? '')
      const token = await result.user.getIdToken()
      // このtokenをヘッダーの乗っけてAPIを叩きます
      console.log(token)
    } catch (e) {
      console.error("setAuthエラー内容", e)
    }
  }, []);

  const useGoogleLogin = useCallback(async () => {
    try {
      const result = await googleLogin()
      await setAuth(result)
    } catch (e) {
      console.error("useGoogleLoginエラー内容", e)
    }
  }, [setAuth]);

  const useAppleLogin = useCallback(async () => {
    try {
      const result = await appleLogin()
      await setAuth(result)
    } catch (e) {
      console.error("useAppleLoginエラー内容", e)
    }
  }, [setAuth]);

  return (
    <div>
      <button onClick={useGoogleLogin}>googleログイン</button>
      <button onClick={useAppleLogin}>appleログイン</button>
      <p>{!name && <>未ログイン: { name }</>}</p>
      <p>{name && <>ログイン中の名前: { name }</>}</p>
    </div>
  );
}
