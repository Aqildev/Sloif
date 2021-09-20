import React, { useState, useEffect } from 'react'
import { NoderedUtil } from '@openiap/openflow-api'
import { QueryCall } from '../../Helper/OpenFlowCalls'
import { Button,TextField,MenuItem, Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { getGridDateOperators } from '@mui/x-data-grid'
export default function Activities(props) {
    const getPipeline = async () => {
        let pipeline = await QueryCall('pipedrive', { "_type": "pipeline" }, 0, 20, { 'id': 1 })
        console.log(pipeline)
        setPipelineData(pipeline)

    }
    const getData=async()=>{
        let deals=await QueryCall('pipedrive',{'pipeline_id':pipeline_id},null,null,{"id":1})
        console.log(deals)

    }
const [pipeline_id,setPipeline_id]=useState()
const [pipelineData,setPipelineData]=useState()
    const [Activities, setActivities] = useState()
    const [propdata, setPropData] = useState(props ? props.location ? props.location.data ? props.location.data : null : null : null)
    const [page, setPage] = useState(0)
    const getActivities = async () => {
        let data = await QueryCall('entities', { "_type": "activity", "done": true }, page, 20)
        setActivities(data)

        console.log(data)
        console.log(page)
    }
    useEffect(() => {
        getPipeline()
    },[])
    useEffect(() => {
        getActivities()
    }, [page])
    useEffect(()=>{
        getData()
    },[pipeline_id])
    if (Activities)
        return (
            <Container>
                <TextField select value={pipeline_id} onChange={(e) => setPipeline_id(e.target.value)}>
                    {pipelineData.map((option) =>
                    (
                        <MenuItem key={option.id} value={option.id}>
                            {option.id}
                        </MenuItem>

                    )
                    )}
                </TextField>

                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
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
                                <TableCell align="center">Category</TableCell>
                                <TableCell align="center">Edit</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {Activities.map((activity) => {
                                let done_time;
                                if (activity.done) {
                                    done_time = activity.marked_as_done_time.split(" ")
                                    console.log(done_time)
                                }
                                return (
                                    <TableRow key={activity._id}>
                                        <TableCell component="th" scope="row">
                                            {activity.name}
                                        </TableCell>
                                        <TableCell align="center">{activity.note ? activity.note : 'N/A'}</TableCell>
                                        <TableCell align="center">{activity.assigned_to_user_id ? activity.assigned_to_user_id : 'N/A'}</TableCell>
                                        <TableCell align="center">{activity.stage ? activity.stage : 'N/A'}</TableCell>
                                        <TableCell align="center">{activity.done ? 'True' : 'False'}</TableCell>
                                        <TableCell align="center">{activity.done ? done_time[0] : 'N/A'}</TableCell>
                                        <TableCell align="center">{activity.done ? done_time[1] : 'N/A'}</TableCell>
                                        <TableCell align="center">{activity._status ? activity._status : 'N/A'}</TableCell>
                                        <TableCell align="center">{activity._category ? activity._category : 'N/A'}</TableCell>
                                        <TableCell align="center"><Link to={{ pathname: '/ActivitiesEdit', data: [activity, propdata] }}><Button variant="contained" color="primary">Edit</Button></Link></TableCell>

                                    </TableRow>
                                )
                            }
                            )}
                        </TableBody>

                    </Table>
                </TableContainer>
                <Button variant="contained" color="primary" onClick={() => setPage(page - 1)}>back</Button>
                <Button variant="contained" color="primary" onClick={() => setPage(page + 1)}>next</Button>
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
