//dependencies
const db = require("../models");

//Method to update all records within a project, using incoming data from client when submitting edits. Does not target fields/records that have been changed, but rather overwrites everything.
module.exports ={
    update: async function(req, res) {
        const newData = req.body.updatedData
        try {
            const promises = newData.map(async (item) => {
                await db.Transect
                    .updateOne({_id : item.transect_id},
                            {
                                transect: item.transect,
                                date: item.date,
                                latitude: item.latitude,
                                longitude: item.longitude,
                                elevation: item.elevation,
                                crew: item.crew,
                                additionalSpecies: item.additionalSpecies
                            }
                        ).catch(e=>e);
                    await db.Point
                            .updateOne({_id: item.point_id},
                                    {
                                        point: item.point,
                                        ground_surface: item.ground_surface,
                                        soil_moisture_percentage: item.soil_moisture_percentage,
                                        shrub_density_detail: item.shrub_density_detail,
                                        canopy_score: item.canopy_score,
                                        canopy_taxa: item.canopy_taxa,
                                        hit_one: item.hit_one,
                                        hit_two: item.hit_two
                                    }
                                ).catch(e=>e);
                return true;
            });
            await Promise.all(promises);
        } catch(err) {
            console.error(err);
        }
        
    }
}