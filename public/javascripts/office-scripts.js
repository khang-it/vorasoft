document.addEventListener("DOMContentLoaded", () => {
    const links = document.querySelectorAll("[data-link]");
    const content = document.getElementById("content");

    links.forEach(link => {
        link.addEventListener("click", async (event) => {
            event.preventDefault();
            const url = link.getAttribute("data-link");

            // Load nội dung từ server
            try {
                const response = await fetch(url);
                if (!response.ok) throw new Error("Failed to load content");
                const html = await response.text();
                content.innerHTML = html;
            } catch (error) {
                content.innerHTML = `<p class="text-red-500">Error: ${error.message}</p>`;
            }
        });
    });
});
