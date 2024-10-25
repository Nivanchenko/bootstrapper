htmx.onLoad(function(target) {

  function issueNav(e) {
    
    e.preventDefault();
    
    if (this.innerText == 'Next')
      goNextIssue();
    else
      goPreviousIssue();

  }

  loadIssues = function() {
    
    const file_name = this.dataset.file;

    checked_files.forEach(function(file) {

      if (file.name == file_name) {

        if (editor) {
          eraseText();
          editor.getModel().dispose(); 
          editor.dispose();
        }
  
        let row = document.getElementById('monaco-editor');
        row.style.minHeight = "500px";
        row.classList.remove('invisible');

        document.querySelector("#monaco-files > nav").classList.remove('invisible');
  
        let code = file.code.replaceAll("&lt;", '<');
        code = code.replaceAll("&gt;", '>');
        createEditor('bsl', code, 'bsl-white');
        setOption('disableFolding', true);
        setOption('autoResizeEditorLayout', true);        
        setReviewIssues(JSON.stringify(file.issues));
        setTheme('bsl-white');
        setReadOnly(true);
        showStatusBar(true);

      }

    });

  };

  const files = document.querySelectorAll(".checked-file");
  for (let i = 0; i < files.length; i++) {
    files[i].addEventListener("click", loadIssues);
  }

  const nav = document.querySelectorAll("#monaco-files > nav a")
  for (let i = 0; i < nav.length; i++) {
    nav[i].addEventListener("click", issueNav);
  }

})