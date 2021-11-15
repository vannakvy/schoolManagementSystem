
const BuildingLabels = {
    docs: "buildings",
    limit: "perPage",
    nextPage: "next",
    prevPage: "prev",
    meta: "paginator",
    page: "currentPage",
    pagingCounter: "slNo",
    totalDocs: "totalDocs",
    totalPages: "totalPages",
};

export default {
    Query: {
        totalBuilding: async (_, { }, { Building }) => {
            const total = await Building.countDocuments({});
            return total;
        },
        allBuildings: async (_, { }, { Building }) => {

            const buildings = await Building.find({});
            return buildings;
        },
        getBuildingsWithPagination: async (_, { page, limit, keyword }, { Building }) => {
            console.log(Building)

            const options = {
                page: page || 1,
                limit: limit || 10,
                customLabels: BuildingLabels,
                sort: {
                    createdAt: -1,
                },
                populate: "createdBy",
            };
            let query = {
                $or: [
                    { buildingName: { $regex: keyword, $options: "i" } },
                ],
            };

            const buildings = await Building.paginate(query, options);
            console.log(buildings)
            return buildings;
        }
    },
    Mutation: {
        //@Desc create new Building
        //@access auth
        createBuilding: async (_, { newBuilding }, { Building }) => {
            try {
                const isExisted = await Building.findOne({ buildingName: newBuilding.buildingName });
                if (isExisted) {
                    return {
                        message: "The Building with this name is already exist",
                        success: false
                    }
                }
                const buildings = new Building(newBuilding);
                const isCreated = await buildings.save();
                if (!isCreated) {
                    return {
                        message: "Cannot create Building",
                        success: false,
                    }
                }
                return {
                    message: "Building created successfully!",
                    success: true,

                }
            } catch (error) {
                return {
                    message: "Cannot create Building Please contact the admin",
                    success: false,
                }
            }
        },

        //@Desc delete the Building
        //@access admin

        deleteBuilding: async (_, { buildingId }, { Building }) => {
            try {
                const deletedInfo = await Building.findByIdAndDelete(buildingId);


                if (!deletedInfo) {
                    return {
                        success: false,
                        message: "cannot delete this record"
                    }
                }
                return {
                    success: true,
                    message: "Building deleted successfully"
                }
            } catch (error) {
                return {
                    success: false,
                    message: "Cannot delete this record please contact the admin"
                }
            }
        },

        //@Desc update the personal info
        //@access auth

        updateBuilding: async (_, { buildingId, newBuilding }, { Building }) => {
            try {
                const isUpdated = await Building.findByIdAndUpdate(buildingId, newBuilding);
                if (!isUpdated) {
                    return {
                        success: false,
                        message: "Building updated not successfully"
                    }
                }

                return {
                    success: true,
                    message: "Building updated successfully !"
                }

            } catch (error) {
                return {
                    success: false,
                    message: "cannot update the Building please contact the admin"
                }
            }
        }

    }
}