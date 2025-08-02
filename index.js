 const yesBtn = document.getElementById("btn-yes");
    const noBtn = document.getElementById("btn-no");
    const statusText = document.getElementById("agree-status");
    const countText = document.getElementById("agree-count");

    let agreeCount = 50;
    let totalVotes = 70;
    let pressed = false;
    let spamClicked = false;

    function updateCount() {
        countText.textContent = `${agreeCount} dari ${totalVotes} orang menyetujuinya`;
    }

    function handleVote(type) {
        if (pressed || spamClicked) return;
        localStorage.setItem("hasVoted", "true");

        pressed = true;
        totalVotes++;
        if (type === "yes") {
            agreeCount++;
            yesBtn.classList.add("pressed");
        } else {
            noBtn.classList.add("pressed");
        }

        yesBtn.disabled = true;
        noBtn.disabled = true;

        updateCount();

        // Reset pressed status if spam detected (rapid clicks)
        if (!spamClicked) {
            spamClicked = false;
            statusText.textContent = "Kamu harus tunggu 1 menit sebelum memilih lagi.";
            setTimeout(() => {
                spamClicked = false;
                pressed = false;
                yesBtn.disabled = false;
                noBtn.disabled = false;
                yesBtn.classList.remove("pressed");
                noBtn.classList.remove("pressed");
                statusText.textContent = "Apakah anda setuju produk ini bermanfaat?";
            }, 60000);
        }
    }

    if (localStorage.getItem("hasVoted")) {
  yesBtn.disabled = true;
  noBtn.disabled = true;
  statusText.textContent = "Kamu sudah memilih sebelumnya.";
}
    yesBtn.addEventListener("click", () => handleVote("yes"));
    noBtn.addEventListener("click", () => handleVote("no"));

    updateCount();
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach(item => {
  item.querySelector(".faq-question").addEventListener("click", () => {
    faqItems.forEach(i => i.classList.remove("active"));
    item.classList.add("active");
  });
});