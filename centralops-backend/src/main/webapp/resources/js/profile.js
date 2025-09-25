document.addEventListener("DOMContentLoaded", async () => {
  const posInput = document.getElementById("positionName");
  const secInput = document.getElementById("sectionName");
  const positionLabel = document.getElementById("positionLabel");

  const positionId = posInput.value;   // current ID
  const sectionId = secInput.value;    // current ID

  // Replace ID with Position Name
  if (positionId) {
    try {
      const res = await fetch(`/api/pos/${positionId}`);
      if (res.ok) {
        const posName = await res.text();
        posInput.value = posName;             // update input
        positionLabel.textContent = posName;  // update label beside picture
      }
    } catch (e) {
      console.error("Failed to fetch position name", e);
    }
  }

  // Replace ID with Section Name
  if (sectionId) {
    try {
      const res = await fetch(`/api/sect/${sectionId}`);
      if (res.ok) {
        secInput.value = await res.text();
      }
    } catch (e) {
      console.error("Failed to fetch section name", e);
    }
  }
});
