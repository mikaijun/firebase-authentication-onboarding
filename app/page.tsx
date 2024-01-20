// Next.jsの機能なので無視でOK
"use client"

// React.jsの機能なので無視でOK
import { useCallback, useState } from "react";
// 別ファイルで定義したfirebaseの関数を読み込みます
import { appleLogin, googleLogin  } from "./firebase";
import { UserCredential } from "firebase/auth";

export default function Home() {

  const [uuid, setUuid] = useState<string>("");
  const [token, setToken] = useState<string>("");

  const setAuth = useCallback(async (result: UserCredential) => {
    try {
      const token = await result.user.getIdToken()
      setToken(token)
      setUuid(result.user.uid)
      // このtokenをヘッダーの乗っけてAPIを叩きます
      console.log({token, uid: result.user.uid})
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
      <p>{!uuid && <>未ログイン</>}</p>
      <p>{uuid && <>uuid: {uuid}</>}</p>
      <p>{token && <>token: { token }</>}</p>
    </div>
  );
}
