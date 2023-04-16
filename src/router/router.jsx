import {Routes, Route} from "react-router-dom";
import {React} from 'react';
import Home from './Container/Home/Home';
import Peserta from "./Container/Peserta/Peserta";
import Log from "./Container/Log/Log";
import Admin from "./Container/Admin/Admin";
import Semak from "./Container/Semak/Semak";
import ProgramEdit from "./Container/ProgramEdit/ProgramEdit";
import ProgramPadam from "./Container/ProgramPadam/ProgramPadam";
import PesertaSemak from "./Container/PesertaSemak/PesertaSemak";
import CiptaSijil from "./Container/CiptaSijil/CiptaSijil";
import EditSijil from "./Container/EditSijil/EditSijil";
import Add from "./Container/Add/Add";

import LamanUtama from './Public/LamanUtama/LamanUtama';
import UserLogin from './Public/UserLogin/UserLogin';
import AdminLogin from './Public/AdminLogin/AdminLogin';
import Register from './Public/Register/Register';
import SemakSijil from './Public/SemakSijil/SemakSijil';
import Penyemak from './Public/Penyemak/Penyemak';
import InformasiSijil from './Public/InformasiSijil/InformasiSijil';
import EditProgram from "./Container/EditProgram/EditProgram";

function Router(){
    return(
        <Routes>
        {/*No login required */}
        <Route path='/' element={<LamanUtama/>}/>
        <Route path='/login' element={<UserLogin/>}/>
        <Route path='/semaksijil' element={<SemakSijil/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/admin-login' element={<AdminLogin/>}/>
        <Route path='/maklumat-penyemak' element={<Penyemak/>}/>
        <Route path='/informasi-sijil' element={<InformasiSijil/>}/>

        {/*Admin */}
        <Route path="/admin/home" exact element={<Home />}/>
        <Route path="/admin/peserta" exact element={<Peserta />}/>
        <Route path="/admin/daftar-admin" exact element={<Admin />}/>
        <Route path="/admin/log" exact element={<Log />}/>
        <Route path="/admin/semak" exact element={<Semak title="DATABASE"/>}/>
        <Route path="/admin/program-edit" exact element={<ProgramEdit />}/>
        <Route path="/admin/program-padam" exact element={<ProgramPadam />}/>
        <Route path="/admin/peserta-semak" exact element={<PesertaSemak />}/>
        <Route path="/admin/cipta-sijil" exact element={<CiptaSijil backpage="/admin/semak"/>}/>
        <Route path="/admin/edit-sijil" exact element={<EditSijil backpage="/admin/semak" />}/>
        <Route path="/admin/cipta-sijil-peserta" exact element={<CiptaSijil backpage="/admin/peserta-semak"/>}/>
        <Route path="/admin/edit-sijil-peserta" exact element={<EditSijil backpage="/admin/peserta-semak" />}/>
        <Route path="/admin/add-course" exact element={<Add backpage="/admin/peserta-semak" />}/>
        <Route path="/admin/edit-program" exact element={<EditProgram />}/>
        <Route path="/admin/semak-sijil-peserta" exact element={<InformasiSijil />}/>

        {/*User */}
        <Route path="/user/SeneraiProgramSediaAda" exact element={<SeneraiProgramSediaAda/> }/>
        <Route path="/user/RekodPermohonan" exact element={<RekodPermohonan/>}/>
        <Route path="/user/Detail" exact element={<Detail/>}/>
        <Route path="/user/profile" exact element={<Profile/>}/>

      </Routes>
    )
}

export default Router;