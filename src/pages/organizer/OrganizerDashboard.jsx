import {
useEffect,
useState
} from "react";


import {
CalendarDays,
Ticket,
Users,
Wallet
} from "lucide-react";


import Sidebar from "../../components/ui/Sidebar";
import StatCard from "../../components/ui/StatCard";
import RevenueChart from "../../components/ui/RevenueChart";


import {
getOrganizerDashboard
} from "../../services/organizerService";



function Dashboard(){


const [dashboard,setDashboard]=useState(null);

const [loading,setLoading]=useState(true);



useEffect(()=>{


const loadData=async()=>{

try{

const data =
await getOrganizerDashboard();


setDashboard(data);


}

catch(error){

console.log(error);

}

finally{

setLoading(false);

}


};


loadData();


},[]);




if(loading){

return <p>Chargement...</p>;

}



return (

<div className="
flex
bg-gray-100
min-h-screen
">


<Sidebar/>


<div className="
flex-1
p-8
">


<h1 className="
text-4xl
font-bold
mb-8
">
Tableau de bord
</h1>



<div className="
grid
md:grid-cols-4
gap-6
mb-10
">


<StatCard
title="Evénements"
value={dashboard.events}
icon={<CalendarDays/>}
/>


<StatCard
title="Tickets vendus"
value={dashboard.tickets}
icon={<Ticket/>}
/>


<StatCard
title="Participants"
value={dashboard.users}
icon={<Users/>}
/>


<StatCard
title="Revenus"
value={`${dashboard.revenue} FCFA`}
icon={<Wallet/>}
/>


</div>




<RevenueChart
data={dashboard.chart}
/>



</div>


</div>


)

}


export default Dashboard;