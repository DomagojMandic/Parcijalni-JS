"use strict";

// Funkcija za provjeru je li nešto upisano

// Ovu funkciju ne znam gdje trebam ubaciti kako bi se izvršavala provjera i kako bi nakon prve pretrage i brisanja svega paragraf ponovno bio vidljiv

/* const provjera = () => {
  const p = document.querySelector(".praznina");
  const input = document.getElementById("input");

  if (input.value.trim() === "") {
    p.style.display = "inline";
  } else {
    p.style.display = "none";
  }
}; */

// Ovu gornju funkciju sam pokušao riješiti i ovako, ali isto nisam uspio

const provjera = () => {
  const main = document.querySelector(".outputPolje");
  const p = document.querySelector(".praznina");
  const divs = main.querySelectorAll("div");

  if (main.contains(divs)) {
    // probao sam i sa divs.length jer se dobije node lista, isto nije išlo
    p.style.display = "none";
  } else {
    p.style.display = "inline";
  }
};

// Funkcija za tražilicu

function trazilica() {
  const trazilicaInput = document.getElementById("input");

  trazilicaInput.addEventListener("input", () => {
    const trazilicaUnos = trazilicaInput.value;
    const url = trazilicaUnos
      ? // Ovdje ne znam što sam napravio, ali ovako radi iako mi je za cilj bila sasvim jedna druga stvar.
        // Čim maknem drugi uvjet ternary operatora ne radi tako da ovaj dio nisam dirao iako znam da je netocno
        `https://itunes.apple.com/search?term=${trazilicaUnos}&entity=song`
      : `https://itunes.apple.com/search?term=${trazilicaUnos}&entity=musicArtist`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const output = document.querySelector(".outputPolje");
        output.innerHTML = "";
        data.results.forEach((value) => {
          // Slika
          const image = document.createElement("img");
          image.src = value.artworkUrl100;
          image.style.paddingTop = "2rem";
          image.style.display = "block";

          // Play

          const play = document.createElement("a");
          play.href = "#";
          play.innerHTML = "<i class='fa-solid fa-play'></i>";
          play.style.color = "#fff";
          play.style.fontSize = "3rem";

          // Flex Slike i Play

          const subDiv = document.createElement("div");
          subDiv.appendChild(image);
          subDiv.appendChild(play);

          subDiv.style.display = "flex";
          subDiv.style.justifyContent = "space-around";
          subDiv.style.alignItems = "flex-end";

          // Datum
          const releaseDate = new Date(value.releaseDate);
          const year = releaseDate.getFullYear();

          // Artisti

          const songName = () => {
            let pjesma = value.trackName;
            if (pjesma.length > 62) {
              return pjesma.substring(0, 62);
            } else {
              return pjesma;
            }
          };

          // Div

          const div = document.createElement("div");
          div.style.fontSize = "1.6rem";
          div.style.padding = "2rem";
          div.style.margin = "1.5rem";
          div.style.height = "25rem";
          div.style.width = "35rem";
          div.style.border = "3px solid #f5f5f5";
          div.style.borderRadius = "10px";
          div.style.backdropFilter = "blur(5px)";
          div.style.minWidth = "15rem";

          div.innerHTML = `Artist Name: ${value.artistName} </br>
                            Song Name: ${songName()}</br>
                            Release Date: ${year}`;

          // Append

          div.appendChild(subDiv);
          output.appendChild(div);
        });
        console.log(data);
      })

      .catch((error) => {
        console.log("Greška u pretrazi", error);
      });
  });
}

trazilica();
