import React, { useEffect } from "react";
import "./styles/profile.css";
import { db,storage } from '../Backend/firebase/firebase-config'
import { getDoc, doc, updateDoc } from 'firebase/firestore'
import { ref, uploadBytes, listAll, getDownloadURL, deleteObject } from 'firebase/storage';
import { v4 } from 'uuid';
import NavbarU from "../Component/userNavbar/NavbarU";

const ImgUpload = ({ onChange, src }) => (
  <div className="upload-file">
    <label htmlFor="photo-upload" >
      <span className="upload-icon">
        <i class="fa-solid fa-upload fa-xl" style={{ color: "#ffffff" }}></i>

      </span>
    </label>
    <div className="img-wrap img-upload">
      <img for="photo-upload" src={src} alt="profile" className="profile-pic" />
    </div>
    <input id="photo-upload" type="file" onChange={onChange} />
  </div>
);

const Nama = ({ onChange, value }) => (
  <div className="text">
    <label htmlFor="name">NAMA:</label>
    <input
      className="profileinput"
      id="name"
      type="text"
      onChange={onChange}
      maxLength="25"
      value={value}
    />
  </div>
);

const MyKad = ({ onChange, value }) => (
  <div className="text">
    <label htmlFor="myKad">NO.MYKAD:</label>
    <input
      className="profileinput"
      id="mykad"
      type="text"
      onChange={onChange}
      maxLength="12"
      minLength="12"
      value={value}
    />
  </div>
);

const Emelrasmi = ({ onChange, value }) => (
  <div className="text">
    <label htmlFor="emelrasmi">ALAMAT EMEL RASMI:</label>
    <input
      id="emelrasmi"
      type="email"
      onChange={onChange}
      value={value}
      className="profileinput"
    />
  </div>
);

const Emelperibadi = ({ onChange, value }) => (
  <div className="text">
    <label htmlFor="emelperibadi">ALAMAT EMEL PERIBADI:</label>
    <input
      id="emelperibadi"
      type="email"
      onChange={onChange}
      value={value}
      className="profileinput"
    />
  </div>
);

const Gelaran = ({ onChange, value }) => (
  <div className="text">
    <label htmlFor="gelaran">GELARAN:</label>
    <input
      id="gelaran"
      type="text"
      onChange={onChange}
      value={value}
      className="profileinput"
    />
  </div>
);

const Telefon = ({ onChange, value }) => (
  <div className="text">
    <label htmlFor="telefon">TELEFON PEJABAT:</label>
    <input
      id="telefon"
      type="text"
      onChange={onChange}
      value={value}
      className="profileinput"
    />
  </div>
);

const Alamat = ({ onChange, value }) => (
  <div className="text">
    <label htmlFor="telefon">ALAMAT:</label>
    <input
      id="alamat"
      type="text"
      onChange={onChange}
      value={value}
      className="profileinput"
    />
  </div>
);

const Profile = ({
  onSubmit,
  src,
  nama,
  myKad,
  emelrasmi,
  emelperibadi,
  gelaran,
  telefon,
  alamat,
}) => (
  <div className="card">
    <form onSubmit={onSubmit} className="profileform">
      <div className="leftSide">
        <div className="img-wrap">
          <img for="photo-upload" src={src} alt="profile" className="profile-pic" />
        </div>

        <button type="submit" className="editbutton">
          Edit Profile{" "}
        </button>
      </div>
      <div className="frame">
        <div className="headerProfileU">
          <p>Personal Information</p>
        </div>
        <div className="rightSide">
          <div className="formleft">
            <div className="name text">
              NAMA: <div className="textinput">{nama}</div>
            </div>
            <div className="myKad text">
              NO.MYKAD: <div className="textinput">{myKad}</div>
            </div>
            <div className="emelrasmi text">
              ALAMAT EMEL RASMI: <div className="textinput">{emelrasmi}</div>
            </div>
            <div className="emelperibadi text">
              ALAMAT EMEL PERIBADI:{" "}
              <div className="textinput">{emelperibadi}</div>
            </div>
          </div>
          <div className="formright">
            <div className="gelaran text">
              GELARAN:<div className="textinput">{gelaran}</div>
            </div>
            <div className="telefon text">
              TELEFON PEJABAT:<div className="textinput">{telefon}</div>
            </div>
            <div className="alamat text">
              ALAMAT: <div className="textinput">{alamat}</div>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
);



export default class profile extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      file: "",
      imagePreviewUrl:
        "https://lumiere-a.akamaihd.net/v1/images/c94eed56a5e84479a2939c9172434567c0147d4f.jpeg?region=0,0,600,600&width=480",
      imageOriginalUrl:"",
      imageUrl:
        "https://lumiere-a.akamaihd.net/v1/images/c94eed56a5e84479a2939c9172434567c0147d4f.jpeg?region=0,0,600,600&width=480",
      nama: "teoh",
      myKad: "ic",
      emelrasmi: "",
      emelperibadi: "",
      gelaran: "",
      telefon: "",
      alamat: "",
      active: "profile",
    };

    const getProfile = async () => {
      const userID = localStorage.getItem("userID");
      const docRef = doc(db, "User", userID);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data().emelPeribadi);
        await this.setState({
          nama: docSnap.data().nama,
          myKad: docSnap.data().ic,
          emelrasmi: docSnap.data().emelRasmi,
          emelperibadi: docSnap.data().emelPeribadi,
          gelaran: docSnap.data().gelaran,
          telefon: docSnap.data().telefonPejabat,
          alamat: docSnap.data().alamat,
          imageOriginalUrl: docSnap.data().imageUrl,
          imageUrl: docSnap.data().imageUrl,
        });
        console.log(docSnap.data().emelRasmi)
        console.log(this.state.emelrasmi)
      } else {
        // docSnap.data() will be undefined in this case
        alert("!!Something Wrong Occur!! Please try later");
      }
    }
    getProfile();
  }


  photoUpload = (e) => {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];
    reader.onloadend = () => {
      this.setState({
        file: file,
        imageUrl: reader.result,
      });
    };
    reader.readAsDataURL(file);
  };

  editNama = (e) => {
    const nama = e.target.value;
    this.setState({
      nama,
    });
  };

  editmyKad = (e) => {
    const regex = /^[0-9\b]+$/;
    if (e.target.value === "" || regex.test(e.target.value)) {
      this.setState({
        myKad: e.target.value,
      });
    }
  };

  editemelrasmi = (e) => {
    const emelrasmi = e.target.value;
    this.setState({
      emelrasmi:emelrasmi,
    });
  };

  editemelperibadi = (e) => {
    const emelperibadi = e.target.value;
    this.setState({
      emelperibadi:emelperibadi,
    });
  };

  editgelaran = (e) => {
    const gelaran = e.target.value;
    this.setState({
      gelaran:gelaran,
    });
  };

  edittelefon = (e) => {
    const telefon = e.target.value;
    this.setState({
      telefon:telefon,
    });
  };

  editalamat = (e) => {
    const alamat = e.target.value;
    this.setState({
      alamat:alamat,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    let activeP = this.state.active === "edit" ? "profile" : "edit";
    this.setState({
      active: activeP,
    });
    this.updateProfile();
  };

  async updateProfile() {
    if (this.state.active== "edit"){
      console.log(this.state.nama);
      const userID = localStorage.getItem("userID");
      const docRef = doc(db, "User", userID);
      
      if(this.state.file == ""){
        await updateDoc(docRef, {
          nama: this.state.nama,
          ic: this.state.myKad,
          emelRasmi: this.state.emelrasmi,
          emelPeribadi: this.state.emelperibadi,
          gelaran: this.state.gelaran,
          telefonPejabat: this.state.telefon,
          alamat: this.state.alamat,
        }).then(() => {
          alert("update successful!");
        });
      } else{
        let text = this.state.imageOriginalUrl;
        const myArray = text.split("images%2F");
        const text2 = myArray[1];
        const myArray2 = text2.split("?alt");
        const imageName = myArray2[0];
        const desertRef = ref(storage, `images/${imageName}`);
        deleteObject(desertRef).then(() => {
          const imageRef = ref(storage, `images/${this.state.file.name + v4()}`);
          uploadBytes(imageRef, this.state.file).then((snapshot) => {
            getDownloadURL(snapshot.ref).then(async (url) => {
              await updateDoc(docRef, {
                nama: this.state.nama,
                ic: this.state.myKad,
                emelRasmi: this.state.emelrasmi,
                emelPeribadi: this.state.emelperibadi,
                gelaran: this.state.gelaran,
                telefonPejabat: this.state.telefon,
                alamat: this.state.alamat,
                imageUrl: url,
              }).then(() => {
                alert("update successful!");
              });
            });
          });
        }).catch((error) => {
          alert("Something error happend, please contact adminstrator!!");
          console.log(error);
        });
      }
    }
  }

  render() {
    const {
      imageUrl,
      nama,
      myKad,
      emelrasmi,
      emelperibadi,
      gelaran,
      telefon,
      alamat,
      active,
    } = this.state;
    return (
      <div>
        <NavbarU />
        {active === "edit" ? (
          <div className="card">
            <form onSubmit={this.handleSubmit} className="profileform">
              <div className="leftSide">
                <ImgUpload onChange={this.photoUpload} src={imageUrl} />
                <button type="submit" className="savebutton">
                  Save{" "}
                </button>
              </div>
              <div className="frame">
                <div className="headerProfileU">
                  <p>Personal Information</p>
                </div>
                <div className="rightSide">
                  <div className="formleft">
                    <Nama onChange={this.editNama} value={nama} />
                    <MyKad onChange={this.editmyKad} value={myKad} />
                    <Emelrasmi
                      onChange={this.editemelrasmi}
                      value={emelrasmi}
                    />
                    <Emelperibadi
                      onChange={this.editemelperibadi}
                      value={emelperibadi}
                    />
                  </div>
                  <div className="formright">
                    <Gelaran onChange={this.editgelaran} value={gelaran} />
                    <Telefon onChange={this.edittelefon} value={telefon} />
                    <Alamat onChange={this.editalamat} value={alamat} />
                  </div>
                </div>
              </div>
            </form>
          </div>
        ) : (
          <Profile
            onSubmit={this.handleSubmit}
            src={imageUrl}
            nama={nama}
            myKad={myKad}
            emelrasmi={emelrasmi}
            emelperibadi={emelperibadi}
            gelaran={gelaran}
            telefon={telefon}
            alamat={alamat}
          />
        )}
      </div>
    );
  }
}