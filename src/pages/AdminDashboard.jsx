import {
  Building2,
  ParkingSquare,
  Users,
  CalendarCheck2,
  DollarSign,
  TrendingUp,
  Plus,
  FileBarChart2
} from "lucide-react";
import AuthLayout from "../components/AuthLayout";
export default function AdminDashboard() {

const username =
localStorage.getItem("username") || "Shashi";


const stats=[

{
title:"Parking Lots",
value:5,
icon:<Building2 size={24}/>
},

{
title:"Total Slots",
value:120,
icon:<ParkingSquare size={24}/>
},

{
title:"Customers",
value:85,
icon:<Users size={24}/>
},

{
title:"Bookings",
value:42,
icon:<CalendarCheck2 size={24}/>
},

{
title:"Revenue",
value:"₹15,600",
icon:<DollarSign size={24}/>
},

{
title:"Occupancy",
value:"65%",
icon:<TrendingUp size={24}/>
}

];


const bookings=[

{
name:"Shashi",
slot:"A12",
amount:"₹100",
status:"Active"
},

{
name:"Rahul",
slot:"B7",
amount:"₹50",
status:"Completed"
},

{
name:"Anjali",
slot:"C3",
amount:"₹150",
status:"Active"
}

];


const occupancy=[

{
name:"Mall Parking",
rate:80
},

{
name:"University",
rate:60
},

{
name:"Airport",
rate:90
},

{
name:"Hospital",
rate:50
}

];



return(
<AuthLayout>
<div>


{/* Header */}


<h1 className="text-4xl font-bold">

Welcome Back,

<span className="text-[#8B1E3F]">

 {username} 👋

</span>

</h1>



<p className="text-gray-500 mt-2">

Manage your parking system efficiently.

</p>





{/* Cards */}


<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-5 mt-10">


{

stats.map((item,index)=>(


<div

key={index}

className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-lg transition"

>


<div className="flex justify-between items-center">


<div>


<p className="text-sm text-gray-500">

{item.title}

</p>



<h2 className="text-3xl font-bold mt-2">

{item.value}

</h2>


</div>



<div className="text-[#8B1E3F]">

{item.icon}

</div>


</div>



</div>


))

}


</div>





{/* Recent Bookings */}



<div className="bg-white rounded-3xl p-6 shadow-sm mt-10">


<h2 className="text-2xl font-semibold">

Recent Bookings

</h2>




<table className="w-full mt-6">


<thead>


<tr className="border-b">


<th className="text-left py-3">

Customer

</th>


<th>

Slot

</th>


<th>

Amount

</th>



<th>

Status

</th>


</tr>



</thead>




<tbody>


{

bookings.map((item,index)=>(


<tr

key={index}

className="border-b"

>


<td className="py-4">

{item.name}

</td>



<td>

{item.slot}

</td>



<td>

{item.amount}

</td>



<td>


<span


className={`

px-3
py-1

rounded-full

text-sm


${

item.status==="Active"

?

"bg-green-100 text-green-700"

:

"bg-gray-100 text-gray-700"

}


`}


>


{item.status}



</span>



</td>



</tr>



))

}



</tbody>



</table>



</div>






{/* Occupancy */}




<div className="bg-white rounded-3xl p-6 shadow-sm mt-10">


<h2 className="text-2xl font-semibold">

Parking Occupancy

</h2>




<div className="space-y-6 mt-6">



{

occupancy.map((item,index)=>(


<div key={index}>


<div className="flex justify-between mb-2">


<p>

{item.name}

</p>



<p>

{item.rate}%

</p>



</div>




<div className="bg-gray-200 rounded-full h-3">


<div


className="bg-[#8B1E3F] h-3 rounded-full"


style={{

width:`${item.rate}%`

}}


>


</div>


</div>




</div>



))


}



</div>



</div>






{/* Quick Actions */}



<div className="mt-10">


<h2 className="text-2xl font-semibold">

Quick Actions

</h2>



<div className="grid md:grid-cols-4 gap-5 mt-6">



<button

className="bg-[#8B1E3F] text-white p-5 rounded-2xl flex items-center gap-3 hover:bg-[#6e1730]"

>


<Plus/>


Add Parking Lot



</button>




<button

className="bg-[#8B1E3F] text-white p-5 rounded-2xl flex items-center gap-3 hover:bg-[#6e1730]"

>


<Plus/>


Add Slots


</button>




<button

className="bg-[#8B1E3F] text-white p-5 rounded-2xl flex items-center gap-3 hover:bg-[#6e1730]"

>


<FileBarChart2/>


Generate Report


</button>





<button

className="bg-[#8B1E3F] text-white p-5 rounded-2xl flex items-center gap-3 hover:bg-[#6e1730]"

>


<DollarSign/>


Payments



</button>



</div>



</div>



</div>
</AuthLayout>

)

}