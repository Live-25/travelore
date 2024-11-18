document.addEventListener('DOMContentLoaded', () => {
    const learnMoreBtn = document.getElementById('learn-more-btn');
    const bookNowBtn = document.getElementById('book-now-btn');
    const inquireNowBtn = document.getElementById('inquire-now-btn');
    const infoSection = document.getElementById('info-section');
    
    if (learnMoreBtn && bookNowBtn && inquireNowBtn && infoSection) {
      // "Learn more" button functionality
      learnMoreBtn.addEventListener('click', () => {
        if (infoSection.style.display === 'none') {
          infoSection.style.display = 'block';
          learnMoreBtn.textContent = 'Show less';
        } else {
          infoSection.style.display = 'none';
          learnMoreBtn.textContent = 'Learn more';
        }
      });
  
      // "Book now" button functionality
      bookNowBtn.addEventListener('click', () => {
        window.location.href = 'https://example.com/booking'; // Replace with actual booking form URL
      });
  
      // "Inquire now" button functionality
      inquireNowBtn.addEventListener('click', (event) => {
        event.preventDefault();
        alert('Inquiry sent successfully');
      });
    } else {
      console.error('One or more buttons are missing.');
    }
  });
  