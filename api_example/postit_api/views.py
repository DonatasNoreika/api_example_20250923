from django.shortcuts import render
from .serializers import PostSerializer
from rest_framework import generics
from .models import Post, Comment, PostLike, CommentLike

# Create your views here.

class PostList(generics.ListCreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer