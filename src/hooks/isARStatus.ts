import { useEffect, useState } from "react";

export const useARStatus = (data: any) => {
  const [isSupport, SetSupport] = useState(false);
  //const [data,setData] = useState(null);

  const update = (result: any) => {
    SetSupport(result);
  }

  useEffect(() => {
    if (data == null) console.log("bos")
    let src = data.split('.');
    if (src[src.length - 1] == "glb") update(true);
  }, [isSupport])

  return isSupport;
}

