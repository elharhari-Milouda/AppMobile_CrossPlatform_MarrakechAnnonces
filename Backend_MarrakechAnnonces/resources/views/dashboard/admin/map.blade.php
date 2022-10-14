
@extends('dashboard.layout.app')

@section('content')

    <div class="card">

        <h5 class="card-header">All Schools</h5>
        <div class="table-responsive text-nowrap">
            <a href="{{asset('/adds')}}">
                <button type="button" class="btn btn-primary">Ajouter Annonce</button>
            </a>
            <table class="table">
                <thead>
                <tr>
                    <th>School name</th>
                    <th>Adress</th>
                    <th></th>
                    <th></th>
                    <th></th>
                </tr>
                </thead>
                <tbody class="table-border-bottom-0">
                @foreach($schools as $u)
                    <tr>
                        <td><i class="fab fa-angular fa-lg text-danger me-3"></i> <strong>{{$u->name}}</strong></td>
                        <td>{{$u->adress}}</td>

                        <td>
                            <a href="{{asset('/modifs/'.$u->id)}}">
                                <button type="button" class="btn btn-icon btn-outline-warning">
                                    <span class="tf-icons bx bx-edit"></span>
                                </button>
                            </a>
                        </td>
                        <td>
                            <form action="{{asset('/api/dels/'.$u->id)}}" method="post">
                                @csrf
                                @method('delete')

                                <button type="submit" class="btn btn-icon btn-outline-danger">
                                    <span class="tf-icons bx bx-x-circle"></span>
                                </button>

                            </form>
                        </td>
                    </tr>
                @endforeach
                </tbody>
            </table>
        </div>
    </div>


@endsection

