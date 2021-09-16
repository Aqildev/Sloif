import React,{useState,useEffect} from 'react'
import { NoderedUtil } from '@openiap/openflow-api'
import {QueryCall} from '../../Helper/OpenFlowCalls'
import { Button, Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core'

export default function Activities() {
    
    const [Activities,setActivities]=useState()
    const [page,setPage]=useState(0)
    const getActivities=async()=>{
        let data=await QueryCall('pipedrive',{"_type":"activity"},page,20)
        setActivities(data)

        console.log(data)
        console.log(page)
    }
    useEffect(() => {
         getActivities()
    },[page])
    if(Activities)
        return (
            <Container>
            <TableContainer component={Paper}>
                <Table  aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="center">Note</TableCell>
                            <TableCell align="center">UserAssigned</TableCell>
                            <TableCell align="center">Stage</TableCell>
                            <TableCell align="center">Done</TableCell>
                            <TableCell align="center">DoneDate</TableCell>
                            <TableCell align="center">DoneTime</TableCell>
                            <TableCell align="center">Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Activities.map((deal) => 
                        {
                            let done_time;
                            if(deal.done)
                            {
                                done_time=deal.marked_as_done_time.split(" ")
                                console.log(done_time)
                            }
                            return(
                            <TableRow key={deal._id}>
                                <TableCell component="th" scope="row">
                                    {deal.name}
                                </TableCell>
                                <TableCell align="center">{deal.note?deal.note : 'N/A'}</TableCell>
                                <TableCell align="center">{deal.assigned_to_user_id?deal.assigned_to_user_id : 'N/A'}</TableCell>
                                <TableCell align="center">{deal.stage?deal.stage : 'N/A'}</TableCell>
                                <TableCell align="center">{deal.done?'True' : 'False'}</TableCell>
                                <TableCell align="center">{deal.done?done_time[0]: 'N/A'}</TableCell>
                                <TableCell align="center">{deal.done?done_time[1] : 'N/A'}</TableCell>
                                <TableCell align="center">{deal.status?deal.status : 'N/A'}</TableCell>
                                    
                            </TableRow>
                        )}
)}
                    </TableBody>

                    </Table>
                    </TableContainer>
                    </Container>
        )
    else
    return null

}




{/* <div>
{Activities.map((Activities)=>{
    return(
        <li key={Activities.id}>{Activities.name}</li>
    )
})}
<button onClick={()=>setPage(page-1)}>back</button>
<button onClick={()=>setPage(page+1)}>next</button>
</div>
)
} */}
