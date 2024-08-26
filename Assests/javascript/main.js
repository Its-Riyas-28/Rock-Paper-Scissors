document.getElementById('rules-button').addEventListener('click', function() {
    const rules = document.querySelector('.rules');
    const closeButton = document.querySelector('.close-button');
  
    if (rules.style.transform === 'scale(1)') {
      rules.style.transform = 'scale(0)';
      closeButton.style.display = 'none';
    } else {
      rules.style.transform = 'scale(1)';
      closeButton.style.display = 'flex';
    }
  });
  
  document.getElementById('close-button').addEventListener('click', function() {
    document.querySelector('.rules').style.transform = 'scale(0)';
    document.querySelector('.close-button').style.display = 'none';
  });
  