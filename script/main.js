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

  // 处理包含HTML标签的wishHeading内容
  const hbdContent = hbd.innerHTML
  const parts = hbdContent.split(/<br>/g)
  let processedContent = ''
  
  parts.forEach((part, index) => {
    if (part.trim()) {
      // 检查是否包含HTML标签
      if (part.includes('<span') && part.includes('</span>')) {
        // 保持HTML标签完整，只对标签外的文字进行字符分割
        const spanMatch = part.match(/(.*?)(<span[^>]*>.*?<\/span>)(.*)/)
        if (spanMatch) {
          const before = spanMatch[1]
          const spanTag = spanMatch[2]
          const after = spanMatch[3]
          
          let beforeSpans = before ? `<span>${before.split('').join('</span><span>')}</span>` : ''
          let afterSpans = after ? `<span>${after.split('').join('</span><span>')}</span>` : ''
          
          processedContent += beforeSpans + spanTag + afterSpans
        } else {
          processedContent += `<span>${part.split('').join('</span><span>')}</span>`
        }
      } else {
        processedContent += `<span>${part.split('').join('</span><span>')}</span>`
      }
    }
    if (index < parts.length - 1) {
      processedContent += '<br>'
    }
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
    .staggerFrom(
      ".wish-hbd span",
      0.98,
      {
        opacity: 0,
        y: -20,
        ease: Elastic.easeOut.config(1, 0.5)
      },
      0.14
    )
    .staggerFromTo(
      ".wish-hbd span",
      0.98,
      {
        scale: 1
      },
      {
        scale: 1,
        color: "#ff69b4",
        ease: Expo.easeOut
      },
      0.14,
      "party"
    )
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
