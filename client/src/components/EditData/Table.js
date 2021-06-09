import React, { forwardRef } from 'react'
import MaterialTable from 'material-table'


//icons
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  };

const Table = (props) => {
    //console.log(props)
    return (
        <div style={{ maxWidth: '100%' }}>
        <MaterialTable
          columns={[
            {
                title: 'date',
                field: 'date',
                //render: rowData => moment(rowData.validated_at).format('MM/DD/YYYY')

            },
            {
                title: 'transect',
                field: 'transect'
            },
            {
                title: 'point',
                field: 'point'
            },
            {
                title: '1st hit',
                field: 'hit_one'
            },
            {
                title: '2nd hit(s)',
                field: 'hit_two',
                // render: rowData => rowData.hit_two ? rowData.hit_two.join(', '): 'nooo'
            },
            {
                title: 'ground surface',
                field: 'ground_surface'
            },
            {
                title: 'soil moisture %',
                field: 'soil_moisture_percentage'
            },
            {
                title: 'canopy score',
                field: 'canopy_score'
            },
            {
                title: 'canopy taxa',
                field: 'canopy_taxa',
                // render: rowData => rowData.canopy_taxa ? rowData.canopy_taxa.join(', '): 'nooo'
            },
            {
                title: 'shrub detail',
                field: 'shrub_density_detail'
            },
            {
                title: 'addtional taxa',
                field: 'additionalSpecies',
                // render: rowData => rowData.additionalSpecies ? rowData.additionalSpecies.join(', '): 'nooo'
            },
            {
                title: 'latitude',
                field: 'latitude'
            },
            {
                title: 'longitude',
                field: 'longitude'
            },
            {
                title: 'elevation',
                field: 'elevation'
            },
            {
                title: 'crew',
                field: 'crew'
            }
          ]}
            data={props.data}
            title={props.project}
            icons={tableIcons}
            editable={props.editable}
            options={{
                rowStyle: {
                    fontSize: 12
                }
            }}
            />
      </div>
      )

}

export default Table