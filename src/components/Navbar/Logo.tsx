import Link from "next/link";
import Image from "next/image";

export default function Logo() {
  return (
    <Link href="/">
      <Image
        className="dark:hidden"
        src="/img/logo_light.png"
        alt="开启搬家"
        width={143}
        height={52}
      />
      <Image
        className="hidden dark:block"
        src="/img/logo_dark.png"
        alt="开启搬家"
        width={143}
        height={52}
      />
    </Link>
  );
}
