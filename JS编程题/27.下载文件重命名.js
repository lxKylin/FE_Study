// 下载攻击方式
const downloadAttackMethod = () => {
  let url = `${DOWNLOAD_WEB_ATTACK_METHOD}?fileName=Web攻击风险支持检测的攻击规则.xls`;
  const link = document.createElement('a');
  link.style.display = 'none';
  link.href = url;
  link.setAttribute('download', 'Web攻击风险支持检测的攻击规则.xls');
  document.body.appendChild(link);
  link.click();
};
