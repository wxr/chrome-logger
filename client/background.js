chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.url) {
    $.post( 'http://localhost:8888/log', changeInfo.url )
    .fail(() => {
      alert('Error! Please make sure server is online.');
    });
  }
});

