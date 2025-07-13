/**
 * 将文本复制到剪贴板
 * @param text 需要复制的文本内容
 * @returns Promise 包含复制操作结果
 */
export function copy2clipboard(text: string): Promise<void> {
  return new Promise((resolve, reject) => {
    // 尝试使用现代 Clipboard API
    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(text)
        .then(resolve)
        .catch((err) => {
          // 如果权限被拒绝，回退到传统方法
          if (err.name === 'NotAllowedError') {
            fallbackCopyText(text) ? resolve() : reject(err)
          } else {
            reject(err)
          }
        })
    } else {
      // 传统方法兼容
      fallbackCopyText(text) ? resolve() : reject(new Error('剪贴板API不可用'))
    }
  })
}

// 传统复制方法
function fallbackCopyText(text: string): boolean {
  const textArea = document.createElement('textarea')
  textArea.value = text
  textArea.style.position = 'fixed'
  document.body.appendChild(textArea)
  textArea.focus()
  textArea.select()

  try {
    return document.execCommand('copy')
  } catch (err) {
    return false
  } finally {
    document.body.removeChild(textArea)
  }
}
