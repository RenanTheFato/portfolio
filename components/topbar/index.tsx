import TextType from "../animations/text-type";

export function Topbar(){
  const typingSpeed = 50
  
  const texts = [
    { text: "> ", className: "italic font-brains text-sm text-blue-500" },
    { text: " Welcome to ", className: "font-brains text-sm text-white" },
    { text: "Renan Santana ", className: "font-brains text-sm text-blue-500" },
    { text: "portfolio", className: "font-brains text-sm text-white", showCursor: true },
  ]
  
  const delays = texts.reduce((acc, curr, idx) => {
    if (idx === 0) return [0];
    return [...acc, acc[idx - 1] + (texts[idx - 1].text.length * typingSpeed)];
  }, [] as number[])
  
  return(
    <header className="w-full flex flex-row border-b border-b-white/25 p-4">
      <div className="flex flex-row">
        {texts.map((item, idx) => (
          <TextType 
            key={idx}
            text={item.text} 
            showCursor={item.showCursor ?? false} 
            loop={false} 
            className={item.className}
            initialDelay={delays[idx]}
          />
        ))}
      </div>
      <div>
        
      </div>
    </header>
  )
}