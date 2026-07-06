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



import StatCard from "../../components/ui/StatCard";
import RevenueChart from "../../components/ui/RevenueChart";

import TicketPieChart from "../../components/ui/TicketPieChart";



import {
getAdminDashboard
} from "../../services/adminService";



function Dashboard(){





    


const [dashboard,setDashboard]=useState(null);

const [loading,setLoading]=useState(true);



useEffect(()=>{


const loadData=async()=>{

try{

const data =
await getAdminDashboard();


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
  <>
    <h1 className="text-4xl font-bold mb-8">
      Tableau de bord
    </h1>

    <div className="grid md:grid-cols-4 gap-6 mb-10">
      <StatCard
        title="Utilisateurs"
        value={dashboard.users}
        icon={<Users />}
      />

      <StatCard
        title="Organisateurs"
        value={dashboard.organizers}
        icon={<Users />}
      />

      <StatCard
        title="Événements"
        value={dashboard.events}
        icon={<CalendarDays />}
      />

      <StatCard
        title="Revenus"
        value={`${dashboard.revenue} FCFA`}
        icon={<Wallet />}
      />
    </div>

    <RevenueChart data={dashboard.chart} />
    <TicketPieChart data={dashboard.chart} />
  </>
);
}


export default Dashboard;