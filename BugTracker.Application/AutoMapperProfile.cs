using AutoMapper;
using BugTracker.Application.Bugs.Commands;
using BugTracker.Application.Bugs.DTOs;
using BugTracker.Application.People.Commands;
using BugTracker.Core.Entities;
using BugTracker.Core.Interfaces;

namespace BugTracker.Application
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<IBaseEntity, BaseEntity>()
                .ForMember(dest => dest.CreationDate, opt => opt.Ignore())
                .ForMember(dest => dest.ModifiedDate, opt => opt.Ignore());
            CreateMap<UpdateBugCommand, Bug>(MemberList.Source);
            CreateMap<UpdatePersonCommand, Person>(MemberList.Source);
            CreateMap<Bug, BugDto>(MemberList.Destination)
                .ForMember(dest => dest.PersonName, opt => opt.MapFrom(src => $"{src.Person.FirstName} {src.Person.LastName}"));
        }
    }
}
