const options: any = {
  showNums: [],
  canvas: null,
}

// 随机颜色
function randomColor() {
  const r = Math.floor(Math.random() * 256)
  const g = Math.floor(Math.random() * 256)
  const b = Math.floor(Math.random() * 256)
  return 'rgb(' + r + ',' + g + ',' + b + ')'
}

function draw() {
  const { showNums, canvas } = options

  const canvas_width = canvas.width
  const canvas_height = canvas.height
  const context = canvas.getContext('2d')
  context.fillStyle = 'white'
  context.fillRect(0, 0, 95, 36)

  const sCode = '1,2,3,4,5,6,7,8,9,0' // "A,B,C,E,F,G,H,J,K,L,M,N,P,Q,R,S,T,W,X,Y,Z,1,2,3,4,5,6,7,8,9,0";
  const aCode = sCode.split(',')
  const aLength = aCode.length //获取到数组的长度

  for (let i = 0; i <= 3; i++) {
    const j = Math.floor(Math.random() * aLength) //获取到随机的索引值
    const deg = (Math.random() * 30 * Math.PI) / 180 //产生0~30之间的随机弧度
    const txt = aCode[j] //得到随机的一个内容
    showNums[i] = txt.toLowerCase()
    const x = 10 + i * 20 //文字在canvas上的x坐标
    const y = 20 + Math.random() * 8 //文字在canvas上的y坐标
    context.font = 'bold 23px 微软雅黑'

    context.translate(x, y)
    context.rotate(deg)

    context.fillStyle = randomColor()
    context.fillText(txt, 0, 0)

    context.rotate(-deg)
    context.translate(-x, -y)
  }
  for (let i = 0; i <= 5; i++) {
    //验证码上显示线条
    context.strokeStyle = randomColor()
    context.beginPath()
    context.moveTo(Math.random() * canvas_width, Math.random() * canvas_height)
    context.lineTo(Math.random() * canvas_width, Math.random() * canvas_height)
    context.stroke()
  }
  for (let i = 0; i <= 30; i++) {
    //验证码上显示小点
    context.strokeStyle = randomColor()
    context.beginPath()
    const x = Math.random() * canvas_width
    const y = Math.random() * canvas_height
    context.moveTo(x, y)
    context.lineTo(x + 1, y + 1)
    context.stroke()
  }
}

const refresh = () => {
  draw()
}

const getCode = () => {
  return options.showNums.join('')
}

const init = (canvas: any) => {
  options.canvas = canvas
  refresh()
}

export default {
  init,
  refresh,
  getCode,
}
