document.addEventListener("DOMContentLoaded", async () => {
  const posInput = document.getElementById("positionName");
  const secInput = document.getElementById("sectionName");

  const positionId = posInput.value;   // current ID
  const sectionId = secInput.value;    // current ID

  // Replace ID with Position Name
  if (positionId) {
    try {
      const res = await fetch(`/api/pos/${positionId}`);
      if (res.ok) {
        posInput.value = await res.text(); // backend returns name string
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