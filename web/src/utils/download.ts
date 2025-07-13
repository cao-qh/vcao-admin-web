export const linkDownload = (url: string) => {
  const link = document.createElement('a')
  link.href = url
  link.setAttribute('target', '_blank')
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
