import Link from 'next/link';
const ContactFooterTwo = () => {
  return (
    // 背景色 #1A1F24，外层强制隐藏水平溢出
    <footer className="bg-[#1A1F24] py-10 md:py-12 w-full overflow-x-hidden">
      {/* 内容区域限制最大宽度，并在移动端全面自适应 */}
      <div className="max-w-[1264px] mx-auto px-4 md:px-8">
        
        {/* 顶部品牌 Logo（左对齐） */}
        <div className="mb-6 text-left">
          <h2 className="font-serif text-3xl text-white">
            China Puzzles
          </h2>
        </div>

        {/* 中间信息区：Web端全部横向一行，移动端堆叠，并且允许换行防止溢出 */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-gray-300 text-sm w-full">
          
          {/* 左侧信息组：Web端一行，移动端邮箱、隐私条款分行，添加 flex-wrap 和 min-w-0 防止超出容器 */}
          <div className="flex flex-col md:flex-row md:flex-wrap items-start md:items-center gap-2 md:gap-4 min-w-0">
            <a href="mailto:info@chinapuzzles.com" className="hover:text-white transition-colors shrink-0">
              info@chinapuzzles.com
            </a>
            
            {/* 隐私条款（移动端单独一行，Web端横向，允许在极端窄屏下换行） */}
            <div className="flex flex-row items-center gap-2 whitespace-normal">
              <Link href="/privacypolicy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <span className="text-gray-500">|</span>
              <Link href="/termsconditions" className="hover:text-white transition-colors">
                Terms & Conditions
              </Link>
            </div>
          </div>

          {/* 右侧版权信息（Web端靠右，移动端左对齐，允许换行防止挤压） */}
          <div className="text-left md:text-right whitespace-normal min-w-0">
            <p>Copyright © China Puzzles {new Date().getFullYear()} All rights reserved</p>
          </div>
 
        </div>

      </div>
    </footer>
  );
};

export default ContactFooterTwo;