// Create and inject the modal into the web page
export const createModal = () => {
  const modalHtml = `
    <div id="myExtensionModal" class="system-fonts--body">
      <div class="modal-content">
        <span class="close" id="closeBtn">&times;</span>
        <h2 id="messageHeding">Enter the master<br />PIN to unlock</h2>
        <input id="passwordInput" type="password" placeholder="Enter password to unlock website..." />
        <button id="submitButton" type="button">Submit</button>
      </div>
    </div>
  `;

  const modalStyle = document.createElement("style");
  modalStyle.textContent = `
    #myExtensionModal {
        display: none;
        position: fixed;
        z-index: 9999;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        overflow: auto;
        background-color: rgba(0, 0, 0, 0.8);
        transition: 0.4s;
    }

    .modal-content {
        background-color: #fefefe;
        margin: 15% auto;
        padding: 30px;
        border: 2px solid #cfcfcf;
        width: 420px;
        border-radius: 20px;
        box-shadow: 4px 5px 15px 5px #9d9d9d73;
        text-align: center;
        position: relative;
    }

    .close {
        color: red;
        float: right;
        font-size: 28px;
        font-weight: bold;
        cursor: pointer;
        position: absolute;
        top: 5px;
        right: 8px;
    }

    .close:hover,
    .close:focus {
      color: black;
      text-decoration: none;
      cursor: pointer;
    }

    #messageHeding {
      margin-top: 0;
      font-size: 20px;
      font-weight: 600;
      color: black;
      margin-bottom: 20px;
      line-height: 20px;
    }

    #passwordInput {
        margin-bottom: 10px;
        padding: 14px;
        border-radius: 20px;
        width: 16rem;
        font-weight: bold;
        border: 2px solid #eaeaea;
        outline: none;
        background: #eaeaea;
        transition: ease all 0.3s;
        color: black;
    }

    #submitButton {
        background-color: #4944b9;
        color: white;
        font-size: 16px;
        padding: 14px 25px;
        border: none;
        border-radius: 20px;
        cursor: pointer;
        outline: none;
        transition: ease all 0.3s;
    }

    #submitButton:hover {
      background-color: #45a049;
    }
  `;

  const modalContainer = document.createElement("div");
  modalContainer.innerHTML = modalHtml;

  document.head.appendChild(modalStyle);
  document.body.appendChild(modalContainer);
};
