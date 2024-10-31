htmx.onLoad(function(target) {

  let side_by_side = true;
  let text_before = '';

  function issueNav(e) {

    e.preventDefault();

    if (this.innerText == 'Next')
      nextDiff();
    else if (this.innerText == 'Previous')
      nextDiff();
    else {
      side_by_side = !side_by_side;
      compare(text_before, side_by_side, true);
      setTheme('bsl-white');
    }

  }

  loadDiff = function() {
    
    const file_name = this.dataset.file;

    checked_files.forEach(function(file) {

      if (file.relative_path == file_name) {

        if (editor) {
          setReadOnly(false);
          compare();
          editor.getModel().setValue('');
        }
        else {
          createEditor('bsl', '', 'bsl-white');
          setOption('autoResizeEditorLayout', true);
          showStatusBar(true);
        }
  
        let row = document.getElementById('monaco-editor');
        row.style.minHeight = "500px";
        row.classList.remove('invisible');

        document.querySelector("#monaco-files > nav").classList.remove('invisible');
  
        text_before = file.text_before.replaceAll("&lt;", '<');
        text_before = text_before.replaceAll("&gt;", '>');
        let text_after = file.text_after.replaceAll("&lt;", '<');
        text_after = text_after.replaceAll("&gt;", '>');
        editor.getModel().setValue(text_after);
        window.originalText = text_after;
        compare(text_before, side_by_side, true);
        setReadOnly(true);
        setTheme('bsl-white');

      }

    });

  };

  const files = document.querySelectorAll(".checked-file");
  for (let i = 0; i < files.length; i++) {
    files[i].addEventListener("click", loadDiff);
  }

  const nav = document.querySelectorAll("#monaco-files > nav a")
  for (let i = 0; i < nav.length; i++) {
    nav[i].addEventListener("click", issueNav);
  }

})