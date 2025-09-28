let audioUrl = ""
let audio = null
let isPlaying = false

// Import the data to customize and insert them into page
const fetchData = () => {
  fetch("customize.json")
    .then(data => data.json())
    .then(data => {
      dataArr = Object.keys(data)
      dataArr.map(customData => {
        if (data[customData] !== "") {
          if (customData === "imagePath") {
            document
              .querySelector(`[data-node-name*="${customData}"]`)
              .setAttribute("src", data[customData])
          } else if (customData === "fonts") {
            data[customData].forEach(font => {
              const link = document.createElement('link')
              link.rel = 'stylesheet'
              link.href = font.path
              document.head.appendChild(link)
              //设置body字体
              document.body.style.fontFamily = font.name
            })
          } else if (customData === "music") {
            audioUrl = data[customData]
            audio = new Audio(audioUrl)
            audio.preload = "auto"
          } else {
            const element = document.querySelector(`[data-node-name*="${customData}"]`)
            if (element) {
              element.innerHTML = data[customData].replace(/\n/g, '<br>')
            }
          }
        }

        // Check if the iteration is over
        // Run amimation if so
        if (dataArr.length === dataArr.indexOf(customData) + 1) {
          document.querySelector("#startButton").addEventListener("click", () => {
            document.querySelector(".startSign").style.display = "none"
            animationTimeline()
          }
          )
          // animationTimeline()
        }
      })
    })
}

// Animation Timeline
const animationTimeline = () => {
  // Spit chars that needs to be animated individually
  const textBoxChars = document.getElementsByClassName("hbd-chatbox")[0]
  const hbd = document.getElementsByClassName("wish-hbd")[0]

  textBoxChars.innerHTML = `<span>${textBoxChars.innerHTML
    .split("")
    .join("</span><span>")}</span`

  // 处理wishHeading内容，按句子分组而不是按字符
  const hbdContent = hbd.innerHTML
  const sentences = hbdContent.split(/<br>/g).filter(sentence => sentence.trim())
  
  // 将每个句子包装在一个div中，用于句子级别的动画
  let processedContent = ''
  sentences.forEach((sentence, index) => {
    processedContent += `<div class="sentence" data-sentence="${index}" style="display: none;">${sentence}</div>`
  })
  
  hbd.innerHTML = processedContent

  const ideaTextTrans = {
    opacity: 0,
    y: -20,
    rotationX: 5,
    skewX: "15deg"
  }

  const ideaTextTransLeave = {
    opacity: 0,
    y: 20,
    rotationY: 5,
    skewX: "-15deg"
  }

  const tl = new TimelineMax()

  tl
    .to(".container", 0.14, {
      visibility: "visible"
    })
    .from(".one", 0.98, {
      opacity: 0,
      y: 10
    })
    .from(".two", 0.56, {
      opacity: 0,
      y: 10
    })
    .to(
      ".one",
      0.98,
      {
        opacity: 0,
        y: 10
      },
      "+=3.5"
    )
    .to(
      ".two",
      0.98,
      {
        opacity: 0,
        y: 10
      },
      "-=1.4"
    )
    .from(".three", 0.98, {
      opacity: 0,
      y: 10
      // scale: 0.7
    })
    .to(
      ".three",
      0.98,
      {
        opacity: 0,
        y: 10
      },
      "+=2.8"
    )
    .from(".four", 0.98, {
      scale: 0.2,
      opacity: 0
    })
    .from(".fake-btn", 0.42, {
      scale: 0.2,
      opacity: 0
    })
    .staggerTo(
      ".hbd-chatbox span",
      0.7,
      {
        visibility: "visible"
      },
      0.07
    )
    .to(".fake-btn", 0.14, {
      backgroundColor: "#8FE3B6"
    })
    .to(
      ".four",
      0.7,
      {
        scale: 0.2,
        opacity: 0,
        y: -150
      },
      "+=0.98"
    )
    .from(".idea-1", 0.98, ideaTextTrans)
    .to(".idea-1", 0.98, ideaTextTransLeave, "+=2.1")
    .from(".idea-2", 0.98, ideaTextTrans)
    .to(".idea-2", 0.98, ideaTextTransLeave, "+=2.1")
    .from(".idea-3", 0.98, ideaTextTrans)
    .to(".idea-3 strong", 0.7, {
      scale: 1.15,
      x: 8
    })
    .to(".idea-3", 0.98, ideaTextTransLeave, "+=2.1")
    .from(".idea-4", 0.98, ideaTextTrans)
    .to(".idea-4", 0.98, ideaTextTransLeave, "+=2.1")
    .from(
      ".idea-5",
      0.98,
      {
        rotationX: 15,
        rotationZ: -10,
        skewY: "-5deg",
        y: 50,
        z: 10,
        opacity: 0
      },
      "+=0.7"
    )
    .to(
      ".idea-5 .smiley",
      0.98,
      {
        x: 8
      },
      "+=0.56"
    )
    .to(
      ".idea-5",
      0.98,
      {
        scale: 0.2,
        opacity: 0
      },
      "+=2.8"
    )
    .staggerFrom(
      ".idea-6 span",
      1.12,
      {
        scale: 3,
        opacity: 0,
        rotation: 15,
        ease: Expo.easeOut
      },
      0.28
    )
    .staggerTo(
      ".idea-6 span",
      1.12,
      {
        scale: 3,
        opacity: 0,
        rotation: -15,
        ease: Expo.easeOut
      },
      0.28,
      "+=1.4"
    )
    .staggerFromTo(
      ".baloons img",
      3.5,
      {
        opacity: 0.9,
        y: 1400
      },
      {
        opacity: 1,
        y: -1000
      },
      0.28
    )
    .from(
      ".lydia-dp",
      0.7,
      {
        scale: 3.5,
        opacity: 0,
        x: 25,
        y: -25,
        rotationZ: -45
      },
      "-=2.8"
    )
    .from(".hat", 0.7, {
      x: -100,
      y: 350,
      rotation: -180,
      opacity: 0
    })
    .call(() => {
      // 创建句子循环动画
      const sentences = document.querySelectorAll('.wish-hbd .sentence')
      if (sentences.length > 0) {
        let currentSentence = 0
        
        const showNextSentence = () => {
          // 隐藏所有句子
          sentences.forEach(s => {
            s.style.display = 'none'
            s.style.opacity = '0'
          })
          
          // 显示当前句子
          const current = sentences[currentSentence]
          current.style.display = 'block'
          
          // 淡入动画
          TweenMax.fromTo(current, 0.8, 
            { opacity: 0, y: -20 },
            { 
              opacity: 1, 
              y: 0,
              ease: Power2.easeOut,
              onComplete: () => {
                // 停留2秒后淡出
                TweenMax.to(current, 0.6, {
                  opacity: 0,
                  y: 20,
                  delay: 2,
                  ease: Power2.easeIn,
                  onComplete: () => {
                    currentSentence = (currentSentence + 1) % sentences.length
                    // 延迟0.5秒后显示下一句
                    setTimeout(showNextSentence, 500)
                  }
                })
              }
            }
          )
        }
        
        // 开始句子循环
        showNextSentence()
      }
    })
    .from(
      ".wish h5",
      0.7,
      {
        opacity: 0,
        y: 10,
        skewX: "-15deg"
      },
      "party"
    )
    .staggerTo(
      ".eight svg",
      2.1,
      {
        visibility: "visible",
        opacity: 0,
        scale: 80,
        repeat: 3,
        repeatDelay: 1.96
      },
      0.42
    )
    .to(".six", 0.7, {
      opacity: 0,
      y: 30,
      zIndex: "-1"
    })
    .staggerFrom(".nine p", 1.4, ideaTextTrans, 1.68)


  // tl.seek("currentStep");
  // tl.timeScale(2);

  // Restart Animation on click
  const replyBtn = document.getElementById("replay")
  replyBtn.addEventListener("click", () => {
    tl.restart()

  })
}

// Run fetch and animation in sequence
fetchData()

const playPauseButton = document.getElementById('playPauseButton')

document.getElementById('startButton').addEventListener('click', () => {
  if (audio) {
    togglePlay(true)
  }
})

playPauseButton.addEventListener('click', () => {
  if (audio) {
    togglePlay(!isPlaying)
  }
})

function togglePlay(play) {
  if (!audio) return
  
  isPlaying = play
  play ? audio.play() : audio.pause()
  playPauseButton.classList.toggle('playing', play)
}
