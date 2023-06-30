import Link from "next/link";
import Image from "next/image";
import style from "./logo.module.css";

export default function Logo(props: { className?: string }) {
  return (
    <Link href="/" {...props}>
      <Image
        className={style["logo-light"]}
        src="/img/logo_light.png"
        alt="开启搬家"
        width={143}
        height={52}
      />
      <Image
        className={style["logo-dark"]}
        src="/img/logo_dark.png"
        alt="开启搬家"
        width={143}
        height={52}
      />
    </Link>
  );
}
