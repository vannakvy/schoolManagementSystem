const AttendanceLabels = {
  docs: "attendances",
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
    //@Desc get all the attendaces
    //@access private
    allAttendances: async (_, { }, { Attendance }) => {
      const attendances = await Attendance.find({});
      return attendances;
    },

    //@Desc get all the attendaces with pagination
    //@access auth
    getAttendWithPagination: async (
      _,
      { page, limit, keyword },
      { Attendance }
    ) => {
      const options = {
        page: page || 1,
        limit: limit || 10,
        customLabels: AttendanceLabels,
        sort: {
          attendaceDate: -1,
        },
        populate: "subjectId studentId createdBy",
      };
      const query = {};
      const attendaces = await Attendance.paginate(query, options);
      return attendaces;
    },


    //@Desc get all the attendaces with pagination by student Id
    //@access auth
    getAttendWithPaginationByStudentId: async (
      _,
      { page, limit, keyword, studentId, subjectId },
      { Attendance }
    ) => {
      const options = {
        page: page || 1,
        limit: limit || 10,
        customLabels: AttendanceLabels,
        sort: {
          attendaceDate: -1,
        },
        populate: "subjectId studentId createdBy",
      };
      const query = {
        $and: [{ studentId: studentId }, { subjectId: subjectId }]
      };
      const attendaces = await Attendance.paginate(query, options);
      return attendaces;
    },


    //@Desc get one attendance 
    //@access auth
    getOneAttendace: async (_, { attendanceId }, { Attendance }) => {
      const attendance = await Attendance.findById(attendanceId);
      return attendance;
    },



    getStudentAttentanceBySectionWithPaginsation: async (_, { }, { Attendance }) => {
      const options = {
        page: page || 1,
        limit: limit || 10,
        customLabels: AttendanceLabels,
        sort: {
          attendaceDate: -1,
        },
        // populate: "subjectId studentId createdBy",
      };
      const query = {};
      const attendaces = await Attendance.paginate(query, options);
      return attendaces;
    }

  },
  Mutation: {

    //@Desc create attendance 
    //@Access 
    createAttendance: async (_, { newAttendance }, { Attendance }) => {
      try {
        const attendance = new Attendance(newAttendance);
        const created = await attendance.save()
        if (!created) {
          return {
            success: false,
            message: "មិនអាច បង្កើតវត្តមានបានទេ!"
          }
        }
        return {
          success: true,
          message: "វត្តមានត្រូវបានកត់ត្រា"
        }
      } catch (error) {
        return {
          success: false,
          message: "មិនអាច បង្កើតវត្តមានបានទេ!" + error.message
        }
      }
    },

    //@Desc update attendance 
    //@Access private

    updateAttendance: async (_, { newAttendance, attendanceId }, { Attendance }) => {
      try {
        await Attendance.findByIdAndUpdate(attendanceId, newAttendance, (error, doc) => {
          if (error) {
            return {
              success: false,
              message: "មិនអាចកែប្រែបានទេ!" + error.message
            }
          }
          return {
            success: true,
            message: "កែប្រែបានជោគជ័យ!"
          }
        })
      } catch (error) {
        return {
          success: false,
          message: "មិនអាចកែប្រែបានទេ!" + error.message
        }
      }
    },

    //@Desc delete attendance  by Id
    //@Access private 
    deleteAttendance: async (_, { attendanceId }, { Attendance }) => {
      try {
        const deleted = await Attendance.findByIdAndDelete(attendanceId);
        if (!deleted) {
          return {
            success: false,
            message: "មិនអាចលុបបានទេ"
          }
        }
        return {
          message: "លុបបានជោគជ័យ",
          success: true
        }
      } catch (error) {
        return {
          success: false,
          message: "មិនអាចលុបបានទេ" + error.message
        }
      }
    }
  }
}

// app.post("/products",(req,res,next)=>{
//     let {firstName} = req.body;
//     if(firstName){
//         res.send("You dont have firstName")
//     }else{
//         next()
//     }
// })