import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <body className="w-screen h-screen overflow-hidden">
      <nav className="navbar bg-base-100 shadow-sm">
        <div className="flex-1">
          <Link href="/">
            <Image
              className="dark:hidden"
              src="/logo_light.png"
              alt="开启搬家"
              width={165}
              height={60}
            />
            <Image
              className="hidden dark:block"
              src="/logo_dark.png"
              alt="开启搬家"
              width={165}
              height={60}
            />
          </Link>
        </div>

        <div className="grid grid-flow-col gap-x-6">
          <div className="btn">
            <Image width={25} height={25} src="/icon/moon.svg" alt="次数" />
            <Image width={25} height={25} src="/icon/sun.svg" alt="次数" />
          </div>
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-circle">
              <div className="indicator">
                <Image
                  width={25}
                  height={25}
                  src="/icon/shopping.svg"
                  alt="次数"
                />
                <span className="badge badge-sm indicator-item">8</span>
              </div>
            </label>
            <div
              tabIndex={0}
              className="mt-3 card card-compact dropdown-content w-52 bg-base-100 shadow"
            >
              <div className="card-body">
                <span className="font-bold text-lg text-red-500">
                  8<span className="ml-2 text-sm">个任务进行中</span>
                </span>
                <span className="text-info">剩余次数: 0</span>
                <div className="card-actions">
                  <button className="btn btn-primary btn-block">
                    立即购买
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-outline btn-circle avatar">
              <div className="relative w-10 rounded-full overflow-hidden">
                <Image
                  src="/default_avatar.jpg"
                  alt="头像"
                  width={40}
                  height={40}
                />
                <div className="hidden absolute-cover bg-black opacity-30 dark:block" />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <a>基本信息</a>
              </li>
              <li>
                <a>退出登录</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div>
        <aside></aside>
        <div>
          <main></main>
          <footer></footer>
        </div>
      </div>
    </body>
  );
}
